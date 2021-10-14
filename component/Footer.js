import html from '../core.js'
// import connect
import { connect } from '../store.js'


// Nhận thêm 1 đối số 'filter'
function Footer({ todos, filter, filters }) {
    // Vùng hiển thị số lượng todo chưa hoàn thành (thẻ span), ta dùng filter() để lập qua todos với điều kiện lặp là những item có filters ở trạng thái 'active', và .length để nó đếm số lượng '${todos.filter(filters.active).length}'

    // Vùng thẻ ul li thì thay vì html cứng từng kiểu bộ lọc trong filters thì ta lặp qua filters và map qua từng kiểu bộ lọc 'type' dùng chính tham số type (loại bộ lọc) khi map qua filters thì ta dùng chính cái type trong filter làm tên cho các tab bộ lọc khi render ra UI, sau này ta có thêm type nào khác vào filters thì nó cũng sẽ tự động render ra UI chứ mình ko cần phải viết từng thẻ HTML mới render các tab bộ lọc ra UI
    // '${type[0].toUpperCase()}' để nó viết HOA ký tự đầu (A, A, C)của tên tab từng loại filter (Add, Active, Completed) vì trong filters (reducer.js) ta viết tên các filter type trong filter là chữ thường hết (add, active, completed). Vì đoạn trên chỉ là lấy ký tự đầu (A, A, C) nên ta muốn viết các ký tự còn lại của các tên filter thì nối bằng cách '${type[0].toUpperCase() + type.slice(1)}

    // class 'selected' của thẻ <li> là class dc CSS sẵn, thẻ <li> nào có class này thì sẽ có border xung quanh tên bộ lọc (dc User chọn), nên ta dùng biến nội suy để xét xem nếu filter = type (tên các filter trong filters) thì filter đó có class 'selected', vì trong reducer.js ta mặc định filter: 'all' nên tên bộ lọc có tên là 'all' sẽ mặc định có sẵn class 'selected'. Nhưng sau này ta muốn click vào tên filter nào thì thì chỉ filter dc click mới có class 'selected'

    // Ta lắng nghe event onclick vào thẻ <a> trong <li> 'onclick=dispatch('switchFilter', '${type}')>' vì type là chuỗi nên ta phải thêm dấu '' bao quanh type ('${type}')

    // Viết điều kiện (chỉ cần ít nhất 1 todo item dc completed thì hiện nút 'Clear completed'), nếu ko có todo item nào dc completed thì ẩn nút này đi
    // Bắt sự kiện để xóa tất cả các todo item đã completed
    return html`
        <footer class="footer">
            <span class="todo-count">
                <strong>${todos.filter(filters.active).length}</strong> item left
            </span>
            <ul class="filters">
                ${Object.keys(filters).map(type => html`
                    <li>
                        <a class="${filter === type && 'selected'}" href="#" onclick="dispatch('switchFilter', '${type}')">
                            ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `)}
            </ul>
            ${todos.filter(filters.completed).length > 0 && html`
                <button class="clear-completed" onclick="dispatch('clearCompleted')">Clear completed</button>
            `}
            </footer>
    `
}



export default connect()(Footer)