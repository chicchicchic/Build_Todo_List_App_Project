import html from '../core.js'
// import connect vào đeể lấy data trong store
import { connect } from '../store.js'
// Import Header component vào App.js
// Vì Header này nó là component nhưng thực chất bno1 chỉ là function, nên ta nội suy nó vào App như 1 func, cấu trúc App giống tmp.js nhưng nó chia thành nhiều component nhỏ và import từng phần vào App
import Header from '../component/Header.js'
// Import TodoList component vào App.js
import TodoList from '../component/TodoList.js'
// Import Footer component vào App.js
import Footer from '../component/Footer.js'



// get todos ở App sau khi dùng connect để lấy data từ Store
function App({ todos }) {
    //Check todo.length > 0 thì mới render phần todoList và phần Footer, khi ko có item nào trong List thì mình ẩn TodoList và Footer đi
    // Khi ta Add item vào thì mới hiện các item và hiện phần Footer kèm theo, còn nếu list trống thì nó chỉ có Phần Header dc hiện
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length > 0 && TodoList()}
            ${todos.length > 0 && Footer()}
        </section>
    `
}



export default connect()(App)