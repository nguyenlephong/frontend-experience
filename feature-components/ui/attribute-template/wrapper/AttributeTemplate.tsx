import React, {useEffect, useRef} from 'react';
import {Col, Empty, Row, Space, Switch,} from "antd";
import {useSetState} from "ahooks";
import {emptyFunc, uuidByte} from "./utils";
import {Editor} from '@tinymce/tinymce-react';
import {AttributeIconClose, getOptionsSlashCommands, trackTinymceLoadError} from "./AttributeTemplate.service";
import {
  ATTR_TEMPLATE_CONFIGS,
  AttributeItem, AttributeTemplatePropType,
  AttrTemplateState,
  cssForContentOfEditor
} from "./AttibuteTemplate.constant";

const AttributeTemplate = (props: AttributeTemplatePropType) => {
  const editorRef = useRef();
  const {config, listOfAttributes, defaultValue} = props;
  const [state, setState] = useSetState<AttrTemplateState>({
    isLoadEditor: false,
    disabled: false,
    enabled: true,
    isFocusing: false,
    editorValue: '',
    htmlBody: undefined,
    opts: []
  })

  useEffect(() => {
    setState({opts: listOfAttributes})
  }, [listOfAttributes])

  useEffect(() => {
    setState({htmlBody: defaultValue})
  }, [defaultValue])

  const convertHtmlToTemplate = (htmlDefault?: string, editor?: any): string => {
    const editorCurr = editor || editorRef.current
    const contentHtml = htmlDefault || editorCurr.getContent()

    const tmpDiv = document.createElement('div');
    tmpDiv.id = "template_wrap_" + props.id;

    tmpDiv.innerHTML = contentHtml;

    const attrsNode = tmpDiv.querySelectorAll('.btn-attr-template')

    attrsNode.forEach(node => {
      if (node.hasAttribute("data-attribute-id")) {
        const attrFind = state.opts.find((x: any) => x.id === node.getAttribute("data-attribute-id"));
        if (attrFind) {
          const newNodeWithTemplate = document.createElement('span');
          newNodeWithTemplate.setAttribute("class", "text-attr-template");
          newNodeWithTemplate.innerHTML = `{{${attrFind.value}|}}`;

          //@ts-ignore Thay thế node bằng cái alias attribute với structure {{alias | defaultValue}} vào
          node.parentNode.replaceChild(newNodeWithTemplate, node)
        }

      }
    })
    // @ts-ignore
    const removeWrap: string = tmpDiv?.childNodes?.[0] ? tmpDiv.innerHTML : document.createElement('p').outerHTML;
    return removeWrap;
  }

  const convertHtmlToPlainText = (htmlDefault?: string, editor?: any): string => {
    const editorCurr = editor || editorRef.current
    const contentHtml = htmlDefault || editorCurr.getContent()

    const tmpDiv = document.createElement('div');
    tmpDiv.id = "template_wrap_" + props.id;

    tmpDiv.innerHTML = contentHtml;

    const attrsNode = tmpDiv.querySelectorAll('.btn-attr-template')

    attrsNode.forEach(node => {
      if (node.hasAttribute("data-attribute-id")) {
        const attrFind: AttributeItem | undefined = state.opts.find((x: any) => x.id === node.getAttribute("data-attribute-id"));
        if (attrFind) {
          const newNodeWithTemplate = document.createElement('span');
          newNodeWithTemplate.setAttribute("class", "text-attr-template");
          newNodeWithTemplate.innerHTML = `{{${attrFind.value}|}}`;

          //@ts-ignore Thay thế node bằng cái alias attribute với structure {{alias | defaultValue}} vào
          node.parentNode.replaceChild(newNodeWithTemplate, node)
        }

      }
    })

    // @ts-ignore
    const removeWrap: HTMLElement = tmpDiv?.childNodes?.[0] || document.createElement('p');
    return removeWrap?.outerText;
  }

  const convertTemplateToHtml = (templateDefault?: string, editor?: any): string => {
    const editorCurr = editor || editorRef?.current

    const listOfAttrOption = state.opts || [];

    const contentHtml = templateDefault || editorCurr.getContent({format: "raw"})
    const tmpDiv = document.createElement('div');
    tmpDiv.id = "html_wrap_" + props.id


    tmpDiv.innerHTML = contentHtml;


    const attrsNode = tmpDiv.querySelectorAll('.text-attr-template')

    attrsNode.forEach(node => {
      const attr_value = node?.textContent?.substring(2, node?.textContent?.indexOf("|"))
      const attrFind: AttributeItem | undefined = listOfAttrOption.find((x: any) => x.value === attr_value);
      if(!attrFind) return;

      const newId = uuidByte();
      const newNodeWithTemplate = document.createElement('button');
      newNodeWithTemplate.setAttribute("id", newId)
      newNodeWithTemplate.setAttribute("data-attribute-id", attrFind?.id)
      newNodeWithTemplate.setAttribute("class", "btn-attr-template " + attrFind.category)
      newNodeWithTemplate.setAttribute("contenteditable", "false")

      const closeButton = !state.disabled ? AttributeIconClose(`document.getElementById('${newId}').remove()`) : ""
      newNodeWithTemplate.innerHTML = `${attrFind.title} ${closeButton}`;

      // Thay thế node bằng cái alias attribute với structure {{alias | defaultValue}} vào
      //@ts-ignore
      node.parentNode.replaceChild(newNodeWithTemplate, node)
    })
    return tmpDiv?.childNodes?.[0] ? tmpDiv.innerHTML : document.createElement('p').outerHTML;
  }

  const convertPlainTextToTinyEditor = (htmlDefault?: string, editor?: any) => {
    const editorCurr = editor || editorRef.current

    // @ts-ignore
    let contentPlainText = htmlDefault || editorCurr.getContent({format: "text"});
    const listOfAttrOption = state.opts || [];

    const domWrapContent = document.createElement('div');

    const findAttRegex = /{{(.*?)}}/gm
    const allMatchList = contentPlainText.matchAll(findAttRegex);
    for (const match of allMatchList) {
      const dataTemplate = match[0]
      const attr_value = dataTemplate.substring(2, dataTemplate.indexOf("|"));
      const attrFind: AttributeItem | undefined = listOfAttrOption.find((x: any) => x.value === attr_value) ;
      if (attrFind) {
        const newId = uuidByte();
        const btnAttrDom = document.createElement('button');
        btnAttrDom.setAttribute("id", newId)
        btnAttrDom.setAttribute("data-attribute-id", attrFind?.id)
        btnAttrDom.setAttribute("class", "btn-attr-template " + attrFind.category)
        btnAttrDom.setAttribute("contenteditable", "false")
        const closeButton = !state.disabled ? AttributeIconClose(`document.getElementById('${newId}').remove()`) : ""
        btnAttrDom.innerHTML = `${attrFind.title} ${closeButton}`;

        const btnMapAttr = btnAttrDom.outerHTML
        contentPlainText = contentPlainText.replace(dataTemplate, btnMapAttr)
      }
    }

    domWrapContent.innerHTML = contentPlainText;

    return domWrapContent.outerHTML;
  }

  return (
    <React.Fragment>
      <div className="page">
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <div className="cdp_switch--group fw pd-space-between-center">
                <Space size={12}>
                  <Space>
                    <Switch
                      disabled={state.disabled}
                      id={`switch--turn-on`}
                      className="cdp_switch-primary"
                      onChange={(check) => setState({enabled: check})}
                      checked={state?.enabled}
                    />
                    <div
                      className={`cdp_switch--label ${state.disabled ? "not-allow" : "pointer"}`}
                      onClick={state.disabled ? emptyFunc : () => setState({enabled: !state.enabled})}>
                      Attribute Template
                    </div>
                  </Space>

                </Space>
              </div>
            </Col>

            {state.enabled && state.opts.length > 0 && (
              <Col xs={24}>
                {/* @ts-ignore*/}
                <Editor
                  disabled={props.disabled}
                  id={props.id}
                  /*@ts-ignore*/
                  data-attach-attr={"true"}
                  apiKey={props.tinyKey || ATTR_TEMPLATE_CONFIGS.TINY_EDITOR_KEY}
                  initialValue={state.htmlBody}
                  // @ts-ignore
                  onInit={(_evt, editor) => editorRef.current = editor}
                  init={{
                    selector: "textarea#" + props.id,
                    placeholder: "Gõ '/' để sủ dụng các thuộc tính",
                    // toolbar: false, // "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                    toolbar_mode: 'floating',
                    menubar: false, //"file edit view insert format tools table help",
                    // toolbar: 'template',
                    toolbar: 'btnAttrTemplate',
                    plugins: "slashcommands lists template",
                    toolbar_location: 'bottom',
                    // custom config from parent
                    ...config,
                    forced_root_block: "",
                    // @ts-ignore
                    // inline: true,
                    schema: 'html5',
                    // forced_root_block_attrs: {
                    //   "data-attach-attr": "true",
                    // },
                    valid_elements: '*[*]',
                    extended_valid_elements: "+@[data-options],script[src|async|defer|type|charset],-div[*],-button[*],span[*],i[*]",
                    auto_focus: !!props.autoFocus,
                    // @ts-ignore
                    height: props.height ? props.height : 420,
                    // skin: useDarkMode ? "oxide-dark" : "oxide",
                    skin: "oxide",

                    // content_css: useDarkMode ? "dark" : "default",
                    content_css: [
                      // useDarkMode ? "dark" : "default",
                      "tinymce-5",
                      "https://cdnjs.cloudflare.com/ajax/libs/antd/4.22.5/antd.min.css",
                      // // refs: https://apalfrey.github.io/select2-bootstrap-5-theme/
                      // "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
                      // "https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css",
                      // "https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css",

                      "https://cdn.jsdelivr.net/npm/@coreui/coreui@4.2.0/dist/css/coreui.min.css",
                      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css",

                    ],
                    // noneditable_class: 'mceNonEditable',
                    branding: false,
                    elementpath: false,
                    // template_mdate_format: '%m/%d/%Y : %H:%M',
                    // template_replace_values: {
                    //   username: 'Jack Black',
                    //   staffid: '991234',
                    //   inboth_username: 'Famous Person',
                    //   inboth_staffid: '2213',
                    // },
                    // template_preview_replace_values: {
                    //   preview_username: 'Jack Black',
                    //   preview_staffid: '991234',
                    //   inboth_username: 'Famous Person',
                    //   inboth_staffid: '2213',
                    // },
                    // templates : [
                    //   {
                    //     title: 'Date modified example',
                    //     description: 'Adds a timestamp indicating the last time the document modified.',
                    //     content: '<p>Last Modified: <time class="mdate">This will be replaced with the date modified.</time></p>'
                    //   },
                    //   {
                    //     title: 'Replace values example',
                    //     description: 'These values will be replaced when the template is inserted into the editor content.',
                    //     content: '<p>Name: {$username}, StaffID: {$staffid}</p>'
                    //   },
                    //   {
                    //     title: 'Replace values preview example',
                    //     description: 'These values are replaced in the preview, but not when inserted into the editor content.',
                    //     content: '<p>Name: {$preview_username}, StaffID: {$preview_staffid}</p>'
                    //   },
                    //   {
                    //     title: 'Replace values preview and content example',
                    //     description: 'These values are replaced in the preview, and in the content.',
                    //     content: '<p>Name: {$inboth_username}, StaffID: {$inboth_staffid}</p>'
                    //   }
                    // ],
                    content_style: cssForContentOfEditor,
                    setup: (_editor) => {
                      setState({isLoadEditor: true})

                      _editor.on('SkinLoadError', () => {
                        trackTinymceLoadError("Skin load error");
                      });

                      _editor.on('LanguageLoadError', () => {
                        trackTinymceLoadError("Language load error");
                      });

                      _editor.on('PluginLoadError', () => {
                        trackTinymceLoadError("Plugin load error");
                      });

                      _editor.on('IconsLoadError', () => {
                        trackTinymceLoadError("Icon load error");
                      });

                      if (props.isPlainText) _editor.setContent(convertPlainTextToTinyEditor(props.defaultValue, _editor))
                      else _editor.setContent(convertTemplateToHtml(props.defaultValue, _editor))

                      _editor.on('init', function () {
                        const head = _editor.dom.select('head')[0]
                        _editor.dom.add(
                          head,
                          'script',
                          {
                            src: "https://cdn.jsdelivr.net/npm/@coreui/coreui@4.2.0/dist/js/coreui.bundle.min.js",
                            type: 'text/javascript',
                            integrity: "sha384-n0qOYeB4ohUPebL1M9qb/hfYkTp4lvnZM6U6phkRofqsMzK29IdkBJPegsyfj/r4",
                            crossorigin: "anonymous"
                          }
                        );
                      })

                      // @ts-ignore
                      _editor.editorManager.PluginManager.add('slashcommands', function (editor: any) {
                        const insertActions = getOptionsSlashCommands(editor, state.opts);
                        // Register the slash commands autocompleter
                        editor.ui.registry.addAutocompleter('slashcommands', {
                          ch: '/',
                          minChars: 0,
                          columns: 1,
                          fetch: function (pattern: any) {
                            const matchedActions = insertActions.filter(function (action: any) {
                              if (!["string", "number", "date", "single", "array"].includes(action.type?.toLowerCase()))
                                return false;
                              return action.type === 'separator' || action.text.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
                            });
                            return new Promise(function (resolve: any) {
                              const results = matchedActions.map(function (action: any) {
                                return {
                                  meta: action,
                                  text: `${action.type} - ${action.text} - ${action.category}`,
                                  icon: action.icon,
                                  value: action.text,
                                  type: action.type
                                }
                              });
                              resolve(results);
                            });
                          },
                          onAction: function (autocompleteApi: any, rng: any, _action: string, meta: any) {
                            editor.selection.setRng(rng);
                            // Some actions don't delete the "slash", so we delete all the slash
                            // command content before performing the action
                            editor.execCommand('Delete');
                            meta.action();
                            autocompleteApi.hide();
                          }
                        });
                        return {};
                      });
                    },
                    init_instance_callback: (editor) => {
                      setState({isLoadEditor: !editor.initialized})
                    },
                  }}

                  onBlur={(e) => {
                    if (document.activeElement?.id === `attr-button_${props.id}`) {
                      e.stopPropagation();
                      return;
                    }
                    setState({isFocusing: false})
                    props.onBlur(convertHtmlToTemplate(), convertHtmlToPlainText())
                  }}
                  onFocus={(e: any) => {
                    setState({isFocusing: true})
                    props.onFocus && props.onFocus(e);
                  }}
                  onEditorChange={(content, e) => {
                    setState({editorValue: `${e.getContent({format: 'text'})}`
                    });
                    props.onChange && props.onChange(content, e);
                  }}
                />

              </Col>
            )}

            {state.enabled && state.opts.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Không có dữ liệu"}>
                <span>Hãy đảm bảo rằng bạn đã truyền danh sách attributes cho chúng tôi.</span>
              </Empty>
            )}
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};


export default AttributeTemplate;