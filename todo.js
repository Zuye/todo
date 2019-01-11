class Todo {
    constructor() {
        this.list = [];
    }

    create(text) {
        if (!text.length || this.list.length > 9) return;
        let todo = Object.create(null);

        // Unique ID
        todo["id"] = this.list.length && this.list[this.list.length - 1].id + 1;

        // Boolean completed
        todo["completed"] = false;

        // String text
        todo["text"] = text;

        // Insert object into list
        this.list.push(todo);
    }

    delete(id) {
        this.list = this.list.filter(todo => todo.id != id);
    }
}

const todo = new Todo();


const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Add new Todo to the list array.
    todo.create(form.elements.text.value);
    form.reset();
    renderList(todo.list);
});

function renderList(list) {
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    for(let item of list) {
        let dom = renderItem(item);
        ul.appendChild(dom);
    }
}

function renderItem(item) {
    let dom = document.createElement("li");
    let box = document.createElement("input");
    let text = document.createElement("span");
    let del = document.createElement("button");
    dom.setAttribute("data-key", item.id);
    box.setAttribute("type", "checkbox");
    if (item.completed) {
        box.checked = true;
        text.style.textDecoration = "line-through";
    }
    text.textContent = item.text;
    del.textContent = "x";
    dom.appendChild(box);
    dom.appendChild(text);
    dom.appendChild(del);

    box.addEventListener("change", () => {
        let obj = todo.list.find(item => item.id == dom.dataset.key);
        if (box.checked) {
            text.style.textDecoration = "line-through";
            obj.completed = true;
        } else {
            text.style.textDecoration = null;
            obj.completed = false
        }
    })

    del.addEventListener("click", () => {
        todo.delete(parseInt(dom.dataset.key));
        renderList(todo.list);
    })

    return dom;
}







