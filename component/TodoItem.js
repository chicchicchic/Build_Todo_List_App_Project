import html from '../core.js'


// TodoList component là component main cùa ta
// Nó có gạch chéo ngang các item là do nó có class 'complete', bỏ class đi thì sẽ ko thấy nó gạch cheos nữa

// Dùng destructoring để nhận todo từ TodoList.js
// nhận thêm index sau khi thêm 'index' vào TodoList.js
function TodoItem({ todo, index }) {
    // console.log(todo);

    // '<li class="${todo.completed && 'completed'}">' nghĩa là ở todo ta nhận dc thì nó 1 2 key, thứ nhất là title, thứ hai là completed (dạng boolearn true/false). Nếu completed=true thì nó thêm class 'completed' vào (item dc thêm class 'completed' sẽ nhạt màu và có gạch chéo đánh dấu đã hoàn thành), còn nếu completed=false thì nó ko dc thêm class completed vào (item ko dc thêm 'completed' sẽ sáng màu nghỉa là item chưa hoàn thành)

    // Nút checked (dấu check) cũng làm tương tự như class 'completed', item nào completed=true thì mới có attribute 'checked' (có dấu check)

    // Value khi User edit thông tin item thì ta ném title cùa item vào value

    // Khi User đánh dấu check vào item nào đó thì phải bắt event 'onchange' để nó gạch chéo item (nghĩa là công việc đó đã hoàn thành), dispatch 1 action là 'toggle', khi dispatch toggle thì ta cần biết index của todo đó là gì. Sau khi nhận dc index từ TodoList thì ta có dòng attribute của input để bắt sự kiện khi User đánh dấu check vào bất kỳ item nào trong list todo "onchange="dispatch('toggle', ${index})"

    // Ta có thể soi Element trong devtool (soi vào ô đánh dấu check của mỗi item) để biết index của nó

    // Khi ta nhấn vào item thứ 2 trong List thì logger sẽ ghi lại như sau
    /**
     * toggle (là action name 'toggle')
            Prev State: {todos: Array(2)}
            Action Arguments: [1] (là index của item mà ta đánh dấu check, phần tử thứ 2 trong List thì index là 1)
            Next State: {todos: Array(2)}
     */

    // button có class 'destroy' là nút xóa của mỗi item (khi ta hover vào từng item sẽ thấy nó hiện nút xóa lên). Dispatch 1 action tên 'destroy' và để xóa thì truyền 'index' vào
    // Khi ta hover vào item ta muốn xóa (Vd: item thứ 3 trong list todo) thì nút xóa hiện lên và khi ta click vào nút xóa thì logger sẽ ghi lại như sau:
    /**
     * destroy (là action name 'destroy')
            Prev State: {todos: Array(4)}
            Action Arguments: [2] (là index tại item mà ta click dấu xóa, phần tử thứ 3 trong List thì index là 2)
            Next State: {todos: Array(4)}
     */
    return html`
        <li class="${todo.completed && 'completed'}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange="dispatch('toggle', ${index})">
                <label>${todo.title}</label>
                <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
            </div>
            <input class="edit" value="${todo.title}">
        </li>
    `
}



export default TodoItem