console.log("hello");

// それぞれindex.htmlに記載されているform・input・ulIDを持ってきている
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
// submitすると、自動的にページがリロードされるので、それを防ぐためにevent.preventDefault()を記載する
// submit=Enterした際の処理

if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(input.value);
  add();
});

function add(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    // liタグを作成し、変数liに格納するメソッド
    const li = document.createElement("li");
    //   フォームに入力された値を取得し、新しく作成したli要素のテキストとして設定する
    li.innerText = todoText;
    // li要素にクラス名(list-group-item)を追加する
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });
    //   ulタグの子供として、liタグを追加できる
    ul.appendChild(li);
    //   フォームを送信したら、フォーム内を空にする
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];

  lists.forEach((list) => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through"),
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
