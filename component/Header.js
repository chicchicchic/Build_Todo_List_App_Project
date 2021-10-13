import html from '../core.js'


function Header() {

    // ta bắt event 'onkeyup' vào thẻ input (bấm Enter xuống và nhất lên thì nó bắt dc sự kiện này), mục tiu là khi User nhập thông tin item cần thêm và nhấn Enter thì nó nó sẽ thêm item mà user vừa thêm vào todoList
    // ta có thể thêm 'console.log(event)' vào 'onkeyup' và nhập 1/một vài ký tự để xem nó trả về KeyboardEvent của từng phím mà ta nhấn xuống, khi ta sổ xuống thì sẽ thấy các key value cùa phím mà ta vừa nhấn
    // ta có thẻ thêm 'console.log(event.keyCode) vào 'onkeyup' để xem dc 'keyCode' của các phím mà ta ấn khi ta nhập vào ô input
    // Ở trường hợp này ta quan tâm keyCode của phím Enter (13). Ta sẽ 'onkeyup' khi phím mà ta ấn là Enter (13) và sẽ dispatch 1 action với tên action là 'add' và value đi kèm với action này là chính value của thẻ input (this.value) và loại bỏ luôn khoảng trắng ở 2 đầu khi User nhập các khoảng trống ở 2 đầu (this.value.trim())
    return html`
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())">
        </header>
    `
}



export default Header