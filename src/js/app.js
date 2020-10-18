import Clock from "./clock";

export default class App {
  state = {};

  constructor($target) {
    this.$target = $target;
    this.initTemplate();
  }

  initTemplate() {
    this.$header = document.createElement("header");
    this.$target.append(this.$header);

    this.$main = document.createElement("main");
    this.$target.append(this.$main);
  }
}
