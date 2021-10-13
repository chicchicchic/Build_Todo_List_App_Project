import html from '../core.js'
// Import TodoItem vào TodoList.js vì TodoItem là thành phần trong TodoList nên ta chia nhỏ nó ra thành các component
import TodoItem from '../component/TodoItem.js'


// TodoList component là component main cùa ta
function TodoList() {
    return html`
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${TodoItem()}
                ${TodoItem()}
                ${TodoItem()}
            </ul>
        </section>
    `
}



export default TodoList