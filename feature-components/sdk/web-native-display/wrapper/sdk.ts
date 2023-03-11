import {
  NativeDisplayConfiguration, NativeDisplayOption,
  NativeDisplayStyle, INativeDisplay,
} from "./NativeDisplay.Interface";


const NativeDisplay: INativeDisplay = {
  initWebComponent: function (options: NativeDisplayOption) {
    window.NativeDisplayOptions = options;
    window.customElements.define("web-native-display", NativeDisplayPersonalizeElement);
  }
};

/**
 * refs: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 * lifecycle diagram: https://andyogo.github.io/custom-element-reactions-diagram/
 */
class NativeDisplayPersonalizeElement extends HTMLElement {
  isShowLog;
  configs;
  get profileId() {
    return this.hasAttribute("profile-id");
  }

  constructor() {
    super();
    this.isShowLog = false
    this.configs = {}
  }

  static get observedAttributes() {
    return ["profile-id"];
  }

  getConfiguration() {
    // @ts-ignore
    let profileId: string = this.attributes["profile-id"]?.value;
    // @ts-ignore
    let recipeId = this.attributes["recipe-id"].value;
    // @ts-ignore
    let templateUrl = this.attributes["template-url"].value;
    // @ts-ignore
    let catalogSize = this.attributes["catalog-size"]?.value || 4;
    // @ts-ignore
    let title = this.attributes["title"]?.value || "";
    // @ts-ignore
    let summary = this.attributes["summary"]?.value || "";

    window.NativeDisplayOptions = {
      ...window.NativeDisplayOptions,
      profileId,
      recipeId,
      catalogSize,
      title,
      summary,
      templateUrl
    };

    const defaultConfigs = {
      "enabled": true,
      "options": {
        "showLogs": false,
        "host": "https://nguyenlephong.github.io",
        styles: {
          width: "100%",
          height: "460px",
          containerClassName: ""
        }
      },
      profileId,
      recipeId,
      catalogSize,
      title,
      summary,
      templateUrl
    };
    const configs: NativeDisplayConfiguration = window.NativeDisplayOptions || defaultConfigs;

    this.isShowLog = configs.options.showLogs;
    this.isShowLog && console.log("JS SDK::: NativeDisplayPersonalizeElement::: Configs= ", configs);

    const styles = {
      width: "100%",
      height: "320px",
      containerClassName: "prime-recommendation-render",
      ...configs.options.styles
    };
    this.configs = {
      configs,
      styles
    };
    return {
      configs,
      styles
    };
  }

  renderTemplateElement(configs: NativeDisplayConfiguration, styles: NativeDisplayStyle) {
    const {recipeId, templateUrl} = configs;
    return `
<div class="${styles.containerClassName}">
  <iframe id="${recipeId}" name="${recipeId}" src="${templateUrl}" width="${styles.width}" height="${styles.height}" frameBorder="0">Browser not compatible. </iframe>
</div>
`;
  }

  transportData(frame: HTMLElement, configs: NativeDisplayConfiguration, personalizeData: any) {
    const rec = document.getElementById(configs.recipeId);
    if(rec){
      const transportEventData = {
        type: "transport",
        configs: {...configs},
        data: personalizeData
      };
      this.isShowLog && console.log("JS SDK::: NativeDisplayPersonalizeElement::: Transport Data= ", transportEventData);
      //@ts-ignore
      frame.contentWindow.postMessage(transportEventData, "*");
    }
  }

  triggerListener() {
    this.addEventListener("click", e => {
      alert("You Clicked Me!");
    });

  }

  connectedCallback() {
    if (this.profileId) {
      const {configs, styles} = this.getConfiguration();
      this.isShowLog && console.log("JS SDK::: NativeDisplayPersonalizeElement:: connectedCallback with profileId= ", this.profileId);
      const {recipeId} = configs;

      this.innerHTML = this.renderTemplateElement(configs, styles);

      const rec = document.getElementById(recipeId);
      if (rec) {
        rec.addEventListener("load", async () => {
          const recommendations = await this.recommendation(configs);
          this.isShowLog && console.log("JS SDK::: NativeDisplayPersonalizeElement:: Recommendation= ", recommendations);
          this.transportData(rec, configs, recommendations);
        });
      }

      this.triggerListener();
    } else this.innerHTML = "No profile id";
  }

  attributeChangedCallback() {

  }

  disconnectedCallback() {
    this.isShowLog && console.log('disconnected callback');
  }

  componentWillMount() {
    this.isShowLog && console.log('component will mount');
  }

  componentDidMount() {
    this.isShowLog && console.log('component did mount');
  }

  componentWillUnmount() {
    this.isShowLog && console.log('component will unmount');
  }

  componentDidUnmount() {
    this.isShowLog && console.log('component did unmount');
  }

  async recommendation(configs: NativeDisplayConfiguration) {
    const prime_token = window.localStorage.prime_token;
    const {profileId, recipeId, catalogSize} = configs;
    const headers = {
      "accept": "application/json",
      "access-control-allow-origin": "*",
      "access-control-request-origin": "*",
      "authorization": "Bearer " + prime_token,
      "content-type": "application/json",
      // "x-request-id": uuid()
    }
    const url = `${configs.options.host}/dipi/recommendation/v1/recipe_resolvers/1/${recipeId}/${profileId}?n_item=${catalogSize}&included_properties=*`
    const productFakes = [
      {
        "id": "93224ccf-c2cb-4171-b788-de6fd1e71ff3",
        "slug": "Lotstring",
        "name": "Bread Crumbs - Japanese Style",
        "description": "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris",
        "price": "927149.72",
        "category": [
          "accessories"
        ],
        "image": "http://dummyimage.com/212x100.png/5fa2dd/ffffff",
        "size": [
          "M"
        ],
        "color": [
          "black",
          "green",
          "grey",
          "white"
        ],
        "productImage": "/images/product-01.jpg"
      },
      {
        "id": "bc790f2e-0ead-4332-903a-c400b74e0b24",
        "slug": "Holdlamis",
        "name": "Chips - Assorted",
        "description": "dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien",
        "price": "844494.90",
        "category": [
          "women",
          "accessories",
          "men"
        ],
        "image": "http://dummyimage.com/173x100.png/ff4444/ffffff",
        "size": [
          "XXXL",
          "XL"
        ],
        "color": [
          "green",
          "white",
          "black",
          "grey",
          "red"
        ],
        "productImage": "/images/product-01.jpg"
      }
    ]
    return productFakes;
    return fetch(url, {
      "headers": headers,
      "body": null,
      "method": "GET",
      "credentials": "include"
    })
      .then(res => res.json())
      .then(res => {
        return res.data || [];
      });
  }
}

export {NativeDisplay}