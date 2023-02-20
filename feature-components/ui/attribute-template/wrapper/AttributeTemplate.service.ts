import {uuidByte} from "./utils";

export const trackTinymceLoadError = (type: string) => {
  const data = {
    type: type
  }
  console.info("Track: template_tinymce_load_error", data)
}

export const AttributeIconClose = (functionString: string) => `
<span contenteditable="false" class="btn-close" style="cursor: pointer" onclick="${functionString}">
  <i class="fa-solid fa-xmark-large" style="--fa-pull-margin: 4px; --fa-primary-color: #fff; --fa-inverse: #fff; color: #fff !important;"></i>
</span>
`

export const getButtonAttribute = (item: any, newId: string) => {
  const functionString = `document.getElementById('${newId}').remove()`
  switch (item.category) {
    case "recommended":
      return `<button
        id="${newId}"
        contenteditable="false"
        data-attribute-id="${item.id}"
        class="btn-attr-template ${item.category}"
        >
          <span>
            ${Array.from(Array(3)).map((_e, index) => `${item.title} ${index + 1}`).join(", ")}
          </span> ${AttributeIconClose(functionString)}
        </button>`;
    case "standard":
    case "custom":
    case "catalog":
      return `
        <button
         contenteditable="false"
         id="${newId}"
         data-attribute-id="${item.id}"
         class="btn-attr-template ${item.category}">
         <span>${item.title}</span> ${AttributeIconClose(functionString)}
        </button>
      `

    default:
      return ""
  }
}

export const getOptionsSlashCommands = (editor: any, data: any[]) => {
  return data?.map((item) => {
    return {
      ...item,
      text: item.title || item.name,
      icon: "☞",
      action: function () {
        const newId = uuidByte();
        editor.execCommand('mceInsertContent', false, getButtonAttribute(item, newId))
      }
    }
  });
}