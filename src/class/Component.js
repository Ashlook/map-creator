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

    this._template = document.createElement('div');

    this._style = document.createElement('style');
    this._style.appendChild(document.createTextNode(''));
    
    this.shadowRoot.append(this._style);

    this.init(...args);


  }

  /**
   * 
   * @private
   * @param {Array} [args] List of the constructor arguments
   */
  init(...args) {
    this.onInit(...args);
    this.render();
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
    this.onRender();
    this.childComponents.map((comp) => comp.render());
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
   * @param {Component} comp The component to add
   * @param {HTMLElement} parentNode the parent node, by default the root node
   * @returns {Component} The component
   */
  addComponent(comp, parentNode = this.shadowRoot) {
    this.childComponents.push(comp);
    parentNode.appendChild(comp);
    return comp;
  }

  /**
   * 
   * @param {Component} comp The component to remove
   * @returns {Component} The deleted component
   */
  removeComponent(comp) {
    this.childComponents.splice(this.childComponents.indexOf(comp));
    comp.remove();
    return comp;
  }

  /**
   * 
   * @param {HTMLElement} node The node to append
   * @returns {HTMLElement} The added element
   */
  addChildNode(node) {
    this.shadowRoot.appendChild(node);
    return node;
  }

  /**
   * 
   * @param {HTMLElement} node The node to remove
   * @returns {HTMLElement} The removed element
   */
  removeChildNode(node) {
    this.shadowRoot.removeChild(node);
    return node;
  }

  clearShadowroot() {
    while(this.shadowRoot.firstElementChild) {
      this.shadowRoot.firstElementChild.remove();
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