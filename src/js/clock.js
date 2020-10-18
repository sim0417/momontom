export default class Clock {
  constructor({ $target }) {
    const clock = document.createElement("section");
    clock.id = "clock";
    clock.innerHTML = this.makeTemplate();
    $target.append(clock);
    this.$clock = clock;
    this.runClock();
  }

  makeTemplate() {
    return `<h1 class="clock-time"></h1>`;
  }

  runClock() {
    setInterval(this.render, 1000);
  }

  render = () => {
    const clockTime = this.$clock.querySelector(".clock-time");
    const date = new Date();
    let hour = date.getHours();
    hour = String(hour).padStart(2, "0");
    let min = date.getMinutes();
    min = String(min).padStart(2, "0");
    let sec = date.getSeconds();
    sec = String(sec).padStart(2, "0");

    clockTime.innerText = `${hour}:${min}:${sec}`;
  };
}
