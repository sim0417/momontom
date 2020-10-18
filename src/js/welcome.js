const LOCAL_KET_USER_NAME = "userName";

export default class welcome {
  userName = null;

  constructor({ $target }) {
    const localData = localStorage.getItem(LOCAL_KET_USER_NAME);
    if (localData) {
      this.userName = localData;
    }

    const welcome = document.createElement("section");
    welcome.id = "welcome";
    this.$welcome = welcome;
    $target.append(welcome);
    this.render();
  }

  setState(userName) {
    this.userName = userName;
    this.render();
    localStorage.setItem(LOCAL_KET_USER_NAME, userName);
  }

  render() {
    if (this.userName) {
      const dateTime = new Date();
      const hour = dateTime.getHours();
      let greeting = null;
      if (hour < 6) {
        greeting = "Hellow";
      } else if (hour < 12) {
        greeting = "Good Morning";
      } else if (hour < 18) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening";
      }
      this.$welcome.innerHTML = `<h3 class="user-name__greeting">${greeting}, ${this.userName} !</h3>`;
    } else {
      this.$welcome.innerHTML = `
      <form class="user-name">
        <input class="user-name__input" type="text" placeholder="What's your name ?">
      </form>`;

      this.$welcome.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const { target } = event;
        const { value: userName } = target.querySelector(".user-name__input");
        this.setState(userName);
      });
    }
  }
}
