import html from '../core.js'
// Import TodoItem vào TodoList.js vì TodoItem là thành phần trong TodoList nên ta chia nhỏ nó ra thành các component
import TodoItem from '../component/TodoItem.js'
// import 'connect' từ Store
import { connect } from '../store.js'



// TodoList component là component main cùa ta
// Vì 'filters' mình viết trong Store (reduce.js) nên mình nhận dc 'filters' ở TodoList
// Thêm đối số 'filter' để ta render dữ liệu (các todo item trong List) theo loại filter dc chọn
function TodoList({ todos, filter, filters }) {
    // console.log(filters)

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

    // Check tất cả todo dc check thì thêm attribute 'checked', thì sau khi tất cả item dc User check hoặc ta click vào mũi tên xuống thì input (dấu mũi tên xuống) cũng dc thêm attribute 'checked' nên nó sáng lên, và ngược lại ta nhấn vào mũi tên xuống 1 lần nữa thì nó bỏ check tất cả và mũi tên xuống ko còn sáng nữa 
    // Khi ta click vào dấu mũi tên xuống hoặc check tất cả item (check từng cái) thì logger sẽ ghi lại như sau: (lưu ý: tất cả item dc check thì dấu mũi tên xuống mới sáng lên)
    /**
     * toggleAll (là action name 'toggleAll')
                Prev State: {todos: Array(2)}
                Action Arguments: [true] (input (dấu mũi tên xuống) đang dc User check vào)
                Next State: {todos: Array(2)}
     */
    // Khi ta click vào dấu mũi tên xuống 1 lần nữa hoặc bỏ check một/một vài item (check từng cái) thì logger sẽ ghi lại như sau:
    /**
     * toggleAll (là action name 'toggleAll')
                Prev State: {todos: Array(2)}
                Action Arguments: [false] (input (dấu mũi tên xuống) đang dc User check vào)
                Next State: {todos: Array(2)}
     */


    // Vì value của 'filter' nó trùng với các key của 'filters' (có thể là all hoặc active hoặc completed) nên ta dùng value của 'filter' để lấy ra các function tương ứng của các key trong 'filters' bằng các truyền filter vào filters (filters[filter]), đó cũng là điều kiện trong filter() để ta lọc và render ra các item theo loại filter dc chọn
    return html`
        <section class="main">
            <input 
                id="toggle-all" 
                class="toggle-all" 
                type="checkbox" 
                onchange="dispatch('toggleAll', this.checked)"
                ${todos.every(filters.completed) && 'checked'}
            >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.filter(filters[filter]).map((todo, index) => TodoItem({ todo, index }))}
            </ul>
        </section>
    `
}




// Cũng có thẻ viết như cách bài trước là
// const connector = connect()
// export default connector(TodoList)
export default connect()(TodoList)