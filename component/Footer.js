import html from '../core.js'
// import connect
import { connect } from '../store.js'



function Footer({ todos, filters }) {
    // Vùng hiển thị số lượng todo chưa hoàn thành (thẻ span), ta dùng filter() để lập qua todos với điều kiện lặp là những item có filters ở trạng thái 'active', và .length để nó đếm số lượng '${todos.filter(filters.active).length}'

    // Vùng thẻ ul li thì thay vì html cứng từng kiểu bộ lọc trong filters thì ta lặp qua filters và map qua từng kiểu bộ lọc 'type' dùng chính tham số type (loại bộ lọc) khi map qua filters thì ta dùng chính cái type trong filter làm tên cho các tab bộ lọc khi render ra UI, sau này ta có thêm type nào khác vào filters thì nó cũng sẽ tự động render ra UI chứ mình ko cần phải viết từng thẻ HTML mới render các tab bộ lọc ra UI
    // '${type[0].toUpperCase()}' để nó viết HOA ký tự đầu (A, A, C)của tên tab từng loại filter (Add, Active, Completed) vì trong filters (reducer.js) ta viết tên các filter type trong filter là chữ thường hết (add, active, completed). Vì đoạn trên chỉ là lấy ký tự đầu (A, A, C) nên ta muốn viết các ký tự còn lại của các tên filter thì nối bằng cách '${type[0].toUpperCase() + type.slice(1)}
    return html`
        <footer class="footer">
            <span class="todo-count">
                <strong>${todos.filter(filters.active).length}</strong> item left
            </span>
            <ul class="filters">
                ${Object.keys(filters).map(type => html`
                    <li>
                        <a class="selected" href="#/">
                            ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `)}
            </ul>
            <button class="clear-completed">Clear completed</button>
        </footer>
    `
}



export default connect()(Footer)