import html from '../core.js'


// TodoList component là component main cùa ta
// Nó có gạch chéo ngang các item là do nó có class 'complete', bỏ class đi thì sẽ ko thấy nó gạch cheos nữa
function TodoItem() {
    return html`
        <li class="completed">
            <div class="view">
                <input class="toggle" type="checkbox" checked>
                <label>Taste JavaScript</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `
}



export default TodoItem