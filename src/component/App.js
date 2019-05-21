export class App {
  constructor(t = 'Mon application !') {
    this.title = t;

    this.init();
  }

  init() {
    const title = document.createElement('h1');
    title.innerText = this.title;

    document.body.appendChild(title);
  }
}
