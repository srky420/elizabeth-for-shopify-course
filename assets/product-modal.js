class ProductModel extends HTMLElement {
  constructor() {
    super();
    this.cacheDOM();
    this.addEventListeners();
  }

  cacheDOM() {
    this.modal = document.querySelector("#product-model-modal");
    this.modalBtn = document.querySelector(`#product-model-open-btn-${this.dataset.mediaId}`);
    this.modalBody = this.modal.querySelector("#body");
    this.template = document.querySelector(`product-model[data-media-id="${this.dataset.mediaId}"] > template`);
  }

  addEventListeners() {
    this.modalBtn.addEventListener("click", (e) => {
      this.modalBody.innerHTML = "";
      const clone = this.template.content.cloneNode(true);
      this.modalBody.appendChild(clone);
      this.modalBody.setAttribute("reveal", "auto");
      this.addEventListener("click", this.loadContent());
    });
  }

  loadContent() {
    Shopify.loadFeatures([
      {
        name: "model-viewer-ui",
        version: "1.0",
        onLoad: this.setupModelViewerUI.bind(this)
      }
    ]);
  }

  setupModelViewerUI(errors) {
    if (errors) return;
    this.modelViewerUI = new Shopify.ModelViewerUI(document.querySelector("model-viewer"));
  }
}

const productModel = customElements.define("product-model", ProductModel);