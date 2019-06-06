/**
 * 
 */
export class Component extends HTMLElement {
  /**
   * 
   * @param  {...any} args 
   */
  constructor(...args) {
    super();

    this.attachShadow({ mode: 'open' });

    /** @type {Array<Component>} */
    this.childComponents = [];

    /** @type {HTMLElement} */
    this._template = document.createElement('div');

    this._style = document.createElement('style');
    this._style.appendChild(document.createTextNode(''));
    
    this._template.appendChild(this._style);

    this.init(...args);


  }

  /**
   * 
   * @private
   * @param {Array} [args] List of the constructor arguments
   */
  init(...args) {
    this.onInit(...args);
    this.shadowRoot.append(...this._template.childNodes);
  }

  /**
   * 
   * Method to call at the end of the constructor.
   * @abstract
   * @param {any} [args] 
   */
  onInit(...args) {
    throw new Error('Must implement ' + this.onInit.name);
  }

  /**
   * 
   * @private
   */
  render() {
    this.clearTemplate();
    while(this.shadowRoot.lastElementChild.tagName !== 'STYLE') {
      this.shadowRoot.removeChild(this.shadowRoot.lastElementChild);
    }
    this.onRender();
    this.childComponents.map((comp) => comp.render());
    this.shadowRoot.append(...this._template.childNodes);
  }

  /**
   * 
   * @abstract
   */
  onRender() {
    throw new Error('Must implement ' + this.onRender.name);
  }

  /**
   * 
   * @param {Component} comp
   * @param {HTMLElement} parentNode
   * @returns {Component} The component
   */
  addComponent(comp, parentNode = this._template) {
    this.childComponents.push(comp);
    parentNode.appendChild(comp);
    return comp;
  }

  /**
   * 
   * @param {HTMLElement} node The node to append
   * @returns {Component} The Component
   */
  addChildNode(node) {
    this._template.appendChild(node);
    return node;
  }

  clearTemplate() {
    this.childComponents = [];
    while(this._template.firstChild) {
      this._template.removeChild(this._template.firstChild);
    }
  }

  /**
   * 
   * @param {String} selector 
   * @param {String} rule 
   */
  setStyle(rules) {
    this._style.innerHTML = rules;
  }

  /**
   * Method to call when destroying the component
   */
  destroy() {
    this.root.remove();
  }
}