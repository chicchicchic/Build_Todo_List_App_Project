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
    // '(todo, index) => TodoItem({ todo, index })' ngoài truyền todo vào thì truyền thêm index vào để nó xác định index cho việc dispatch action 'toggle'

    // Lắng nghe event khi User click vào dấu mũi tên đi xuống thì nó sẽ check (hoàn thành) tất cả item trong list và ngược lại nếu click thêm 1 lần nữa thì nó bỏ check tất cà item trong list, ta bắt onchange với dispatch là 1 action tên 'toggleAll' và lấy trạng thái của chính thẻ input (dấu mũi tên) là checked hoặc ko checked "onchange="dispatch('toggleAll', this.checked)"
    // Khi ta click vào dấu mũi tên xuống thì logger sẽ ghi lại như sau:
    /**
     * toggleAll (là action name 'toggleAll')
                Prev State: {todos: Array(2)}
                Action Arguments: [true] (input (dấu mũi tên xuống) đang dc User check vào)
                Next State: {todos: Array(2)}
     */
    return html`
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" onchange="dispatch('toggleAll', this.checked)">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.map((todo, index) => TodoItem({ todo, index }))}
            </ul>
        </section>
    `
}




// Cũng có thẻ viết như cách bài trước là
// const connector = connect()
// export default connector(TodoList)
export default connect()(TodoList)