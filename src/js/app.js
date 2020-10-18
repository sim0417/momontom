import Clock from "./clock";
import Welcome from "./welcome";
import TodoList from "./todoList";
import Weather from "./weather";
import RandomBackground from "./randomBackground";

export default class App {
  state = {};

  constructor($target) {
    this.$target = $target;
    this.initTemplate();
    this.initUserData();

    this.clock = new Clock({ $target: this.$main });
    this.welcome = new Welcome({ $target: this.$main });
    this.todoList = new TodoList({ $target: this.$main });
    this.weather = new Weather({ $target: this.$header });
    this.randomBackground = new RandomBackground({ $target });
  }

  initTemplate() {
    this.$header = document.createElement("header");
    this.$target.append(this.$header);

    this.$main = document.createElement("main");
    this.$target.append(this.$main);
  }

  initUserData() {}
}
