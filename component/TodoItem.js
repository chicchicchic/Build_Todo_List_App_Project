import html from '../core.js'


// TodoList component là component main cùa ta
// Nó có gạch chéo ngang các item là do nó có class 'complete', bỏ class đi thì sẽ ko thấy nó gạch cheos nữa

// Dùng destructoring để nhận todo từ TodoList.js
function TodoItem({ todo }) {
    // console.log(todo);

    // '<li class="${todo.completed && 'completed'}">' nghĩa là ở todo ta nhận dc thì nó 1 2 key, thứ nhất là title, thứ hai là completed (dạng boolearn true/false). Nếu completed=true thì nó thêm class 'completed' vào (item dc thêm class 'completed' sẽ nhạt màu và có gạch chéo đánh dấu đã hoàn thành), còn nếu completed=false thì nó ko dc thêm class completed vào (item ko dc thêm 'completed' sẽ sáng màu nghỉa là item chưa hoàn thành)

    // Nút checked (dấu check) cũng làm tương tự như class 'completed', item nào completed=true thì mới có attribute 'checked' (có dấu check)

    // Value khi User edit thông tin item thì ta ném title cùa item vào value
    return html`
        <li class="${todo.completed && 'completed'}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completed && 'checked'}>
                <label>${todo.title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.title}">
        </li>
    `
}



export default TodoItem