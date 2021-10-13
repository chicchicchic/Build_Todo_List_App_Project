import html from '../core.js'
// Import Header component vào App.js
// Vì Header này nó là component nhưng thực chất bno1 chỉ là function, nên ta nội suy nó vào App như 1 func, cấu trúc App giống tmp.js nhưng nó chia thành nhiều component nhỏ và import từng phần vào App
import Header from '../component/Header.js'
// Import TodoList component vào App.js
import TodoList from '../component/TodoList.js'
// Import Footer component vào App.js
import Footer from '../component/Footer.js'






function App() {
    return html`
        <section class="todoapp">
            ${Header()}
            ${TodoList()}
            ${Footer()}
        </section>
    `
}



export default App