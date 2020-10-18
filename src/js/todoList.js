const LOCAL_KET_USER_TODO = "userTodo";

const STATUS_PENDING = "pending";
const STATUS_FINISHED = "finished";
const ACTION_DELETE = "delete";
const ACTION_MOVE_TO_FINISHED = "move-to-finished";
const ACTION_MOVE_TO_PENDING = "move-to-pending";

export default class TodoList {
  todos = [];

  constructor({ $target }) {
    const localData = localStorage.getItem(LOCAL_KET_USER_TODO);
    if (localData) {
      this.todos = JSON.parse(localData);
    }

    const todoList = document.createElement("section");
    todoList.id = "todoList";
    todoList.innerHTML = this.makeTemplate();
    this.$todoList = todoList;
    $target.append(todoList);

    this.initEventListener();
    this.render();
  }

  makeTemplate() {
    return `
    <article class="todo__title">
      <h2>ToDo-List</h2>
      <form class="form-todo">
        <input type="text" placeholder="Add Task">
      </form>
    </article>

    <article class="todo__column">
      <h2>Pending</h2>
      <ul class="todo__list" id="pending-list"></ul>
    </article>

    <article class="todo__column">
      <h2>Finished</h2>
      <ul class="todo__list" id="finished-list"></ul>
    </article>
    `;
  }

  initEventListener() {
    const formNewTask = this.$todoList.querySelector("form");
    const pendingList = this.$todoList.querySelector("#pending-list");
    const finishedList = this.$todoList.querySelector("#finished-list");

    formNewTask.addEventListener("submit", (event) => {
      event.preventDefault();
      const { target } = event;
      const inputTask = target.querySelector("input");
      this.addNewTask(inputTask.value);
      inputTask.value = null;
    });

    pendingList.addEventListener("click", this.setTodoStateEventHendler);
    finishedList.addEventListener("click", this.setTodoStateEventHendler);
  }

  addNewTask(task) {
    const id = String(new Date().getTime());
    const status = STATUS_PENDING;
    const newTask = { id, task, status };
    this.todos.push(newTask);
    this.setState(this.todos);
  }

  setTodoStateEventHendler = (event) => {
    const { target } = event;
    const action = target.dataset.action;
    if (action) {
      const taskId = target.parentElement.dataset.id;
      const idx = this.todos.findIndex((todo) => taskId === todo.id);
      if (idx > -1) {
        this.processTaskAction({ idx, action });
      }
    }
  };

  processTaskAction({ idx, action }) {
    if (action === ACTION_DELETE) {
      this.todos.splice(idx, 1);
    } else if (action === ACTION_MOVE_TO_FINISHED || action === ACTION_MOVE_TO_PENDING) {
      let task = this.todos[idx];
      task.status = action === ACTION_MOVE_TO_FINISHED ? STATUS_FINISHED : STATUS_PENDING;
      this.todos.splice(idx, 1);
      this.todos.push(task);
    }
    this.setState(this.todos);
  }

  setState(todos) {
    this.todos = todos;
    this.render();

    localStorage.setItem(LOCAL_KET_USER_TODO, JSON.stringify(this.todos));
  }

  render() {
    const pendingList = this.$todoList.querySelector("#pending-list");
    const finishedList = this.$todoList.querySelector("#finished-list");

    pendingList.innerHTML = this.todos
      .map((item) => {
        let template = "";
        if (item.status === STATUS_PENDING) {
          template = `
        <li>
          <span>${item.task}</span>
          <div class="task-list__buttons" data-id="${item.id}">
            <button class="btn" data-action="${ACTION_MOVE_TO_FINISHED}"></button>
            <button class="btn" data-action="${ACTION_DELETE}"></button>
          </div>        
        </li>`;
        }
        return template;
      })
      .join("");

    finishedList.innerHTML = this.todos
      .map((item) => {
        let template = "";
        if (item.status === STATUS_FINISHED) {
          template = `
        <li>
          <span>${item.task}</span>
          <div class="task-list__buttons" data-id="${item.id}">
            <button class="btn" data-action="${ACTION_MOVE_TO_PENDING}"></button>
            <button class="btn" data-action="${ACTION_DELETE}"></button>
          </div>
        </li>`;
        }
        return template;
      })
      .join("");
  }
}
