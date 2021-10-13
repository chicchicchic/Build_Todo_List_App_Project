import html from '../core.js'
// Import TodoItem vào TodoList.js vì TodoItem là thành phần trong TodoList nên ta chia nhỏ nó ra thành các component
import TodoItem from '../component/TodoItem.js'
// import 'connect' từ Store
import { connect } from '../store.js'


const connector = connect()


// TodoList component là component main cùa ta
function TodoList({ todos }) {
    // console ra sẽ thấy props nhận dc init của mình ({todos: Array(2)}), ta dùng destructering để nhận thẳng todos vào 
    // console.log(props);


    // Thay vì ta để TodoItem({todo:todo}) thì ta viết TodoItem({todo}) (Theo Object literal ES6)
    return html`
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.map(todo => TodoItem({todo}))}
            </ul>
        </section>
    `
}




// Cũng có thẻ viết như cách bài trước là
// const connector = connect()
// export default connector(TodoList)
export default connect()(TodoList)