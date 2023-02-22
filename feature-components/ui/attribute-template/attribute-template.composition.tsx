import React, {useMemo} from 'react';
import {AttributeTemplate} from './attribute-template';
import AttributeTemplateContainer from './wrapper/AttributeTemplate';
import {emptyFunc} from "./wrapper/utils";

export const BasicAttributeTemplate = () => {
  const listOfAttributeExamples = useMemo(() => {
    return [
      {
        "id": "2LUZRa3yrxaR2rpvUV1dPz8wski",
        "description": "Email address",
        "title": "email",
        "type": "string",
        "status": "EVENT_STATUS_ACTIVE",
        "stateType": "EVENT_TYPE_DEFINED",
        "created_at": "1675927613",
        "name": "email",
        "alias": "email",
        "category": "standard",
        "value": "trait_email"
      },
      {
        "id": "2LUZRYkdZTYgUHlrUmqx6aDvMI6",
        "description": "Device Type",
        "title": "device_type",
        "type": "string",
        "status": "EVENT_STATUS_ACTIVE",
        "stateType": "EVENT_TYPE_DEFINED",
        "created_at": "1675927613",
        "name": "Device Type",
        "alias": "device_type",
        "category": "standard",
        "value": "trait_device_type"
      },
      {
        "id": "2LUZRYYXpPxx3aXjtipwkGsPYZF",
        "description": "Last name",
        "title": "last_name",
        "type": "string",
        "status": "EVENT_STATUS_ACTIVE",
        "stateType": "EVENT_TYPE_DEFINED",
        "created_at": "1675927613",
        "name": "Last name",
        "alias": "last_name",
        "category": "standard",
        "value": "trait_last_name"
      },
      {
        "id": "2LUZRabQxCIIm3JCOvydlT6x4XN",
        "description": "First Name of the user",
        "title": "first_name",
        "type": "string",
        "status": "EVENT_STATUS_ACTIVE",
        "stateType": "EVENT_TYPE_DEFINED",
        "created_at": "1675927613",
        "name": "First Name of the user",
        "alias": "first_name",
        "category": "standard",
        "value": "trait_first_name"
      },
      {
        "id": "2LUZRUfWJUKjHjSbY66dR4k8euv",
        "description": "Facebook UserID",
        "title": "fb_uid",
        "type": "string",
        "status": "EVENT_STATUS_ACTIVE",
        "stateType": "EVENT_TYPE_DEFINED",
        "created_at": "1675927613",
        "name": "Facebook UserID",
        "alias": "fb_uid",
        "category": "standard",
        "value": "trait_fb_uid"
      },
      {
        "id": "2LUZRZV56HrA1eDNI4CpGQddm7o",
        "description": "Current application version on user's device",
        "title": "app_version",
        "type": "string",
        "status": "EVENT_STATUS_ACTIVE",
        "stateType": "EVENT_TYPE_DEFINED",
        "created_at": "1675927613",
        "name": "Current application version on user's device",
        "alias": "app_version",
        "category": "standard",
        "value": "trait_app_version"
      },

      {
        "type": "string",
        "title": "Id",
        "id": "lecjtljr_8906035567754147",
        "name": "Id",
        "alias": "ID",
        "category": "custom",
        "value": "ptrait_ID"
      },
      {
        "type": "string",
        "title": " Airtable Created Time",
        "id": "lecjtljr_611431206260318",
        "name": " Airtable Created Time",
        "alias": "_airtable_created_time",
        "category": "custom",
        "value": "ptrait__airtable_created_time"
      },
      {
        "type": "array_str",
        "title": " Profileids",
        "id": "lecjtljr_9854121819291761",
        "name": " Profileids",
        "alias": "_profileIds",
        "category": "custom",
        "value": "ptrait__profileIds"
      },
      {
        "id": "voucher",
        "alias": "voucher",
        "name": "Voucher",
        "title": "Voucher",
        "category": "catalog",
        "type": "single",
        "description": "Voucher",
        "value": "catalog_voucher"
      }
    ]
  }, [])

  const defaultValue = useMemo(() => {
    return `<p><strong>Hello</strong>&nbsp; <button contenteditable="false" id="17z1w2" data-attribute-id="2LUZRabQxCIIm3JCOvydlT6x4XN" class="btn-attr-template standard"> <span>first_name</span> <span contenteditable="false" class="btn-close" style="cursor: pointer;" onclick="document.getElementById('17z1w2').remove()"> <i class="fa-solid fa-xmark-large" style="--fa-pull-margin: 4px; --fa-primary-color: #fff; --fa-inverse: #fff; color: #fff !important;"></i> </span> </button> &nbsp;</p>
<p>Mừng ng&agrave;y trở lại của bạn, ch&uacute;ng t&ocirc;i d&agrave;nh tặng bạn <strong><em>voucher</em></strong> c&oacute; gi&aacute; trị hơn <strong>300.000 <em>VND</em></strong>. Bạn h&atilde;y kiểm trả hộp thư email&nbsp; <button contenteditable="false" id="fl5n8u" data-attribute-id="2LUZRa3yrxaR2rpvUV1dPz8wski" class="btn-attr-template standard"> <span>email</span> <span contenteditable="false" class="btn-close" style="cursor: pointer;" onclick="document.getElementById('fl5n8u').remove()"> <i class="fa-solid fa-xmark-large" style="--fa-pull-margin: 4px; --fa-primary-color: #fff; --fa-inverse: #fff; color: #fff !important;"></i> </span> </button>&nbsp; để nhận&nbsp; <button contenteditable="false" id="jgpefd" data-attribute-id="voucher" class="btn-attr-template catalog"> <span>Voucher</span> <span contenteditable="false" class="btn-close" style="cursor: pointer;" onclick="document.getElementById('jgpefd').remove()"> <i class="fa-solid fa-xmark-large" style="--fa-pull-margin: 4px; --fa-primary-color: #fff; --fa-inverse: #fff; color: #fff !important;"></i> </span> </button>&nbsp; nh&eacute;.</p>
<p>Ch&uacute;c bạn sức khỏe!</p>`
  }, [])

  return (
    <AttributeTemplate>
      <AttributeTemplateContainer
        id={"demo-attribute-template"}
        name={"demo-attribute-template"}
        autoFocus={true}
        defaultValue={defaultValue}
        config={{
          plugins: "slashcommands print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern noneditable help charmap quickbars emoticons",
          imagetools_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
          toolbar_sticky: true,
          toolbar_location: 'top',
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          link_list: [{ title: "CV", value: "https://nguyenlephong.github.io" }],
          image_list: [{ title: "CV", value: "https://nguyenlephong.github.io" }],
          importcss_append: true,
          //@ts-ignore
          file_picker_callback: function (callback, _value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === "file") {
              callback("https://www.google.com/logos/google.jpg", {
                text: "My text",
              });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === "image") {
              callback("https://www.google.com/logos/google.jpg", {
                alt: "My alt text",
              });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === "media") {
              callback("movie.mp4", {
                source2: "alt.ogg",
                poster: "https://www.google.com/logos/google.jpg",
              });
            }
          },
          templates: [
            {
              title: "New Table",
              description: "creates a new table",
              content:
                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
              title: "Starting my story",
              description: "A cure for writers block",
              content: "Once upon a time...",
            },
            {
              title: "New list with dates",
              description: "New List with dates",
              content:
                '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
          ],
          template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          height: 420,
          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          toolbar_mode: "sliding",
          contextmenu: "link image imagetools table",
        }}
        disabled={false}
        listOfAttributes={listOfAttributeExamples}
        onBlur={emptyFunc}
        onChange={emptyFunc}
        onFocus={emptyFunc}
        tinyKey={"wzqfwf7rhjpzaiuy31b1jz5t8r7kinw4q3osnkh9n7ojosem"}/>
    </AttributeTemplate>
  );
}