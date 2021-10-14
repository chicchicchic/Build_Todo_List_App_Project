// File này để lưu data của mình vào local storage chứ nếu ko lưu vào storage thì khi mình dispatch action nó thực hiện action và render, nhưng khi mình refresh lại trang thì nó mất


// Đặt 1 key, ta lấy key này để lưu vào storage
const TODOS_STORAGE_KEY = 'TODOS'


// export default ra 1 Object luôn, Object này có tác dụng lấy data của mình từ local storage và lưu data của mình vào local storage
export default {
    // get item vào local storage, nếu ko có thì mặc định nó sẽ lấy 1 Array bởi vì list todo ban đầu của mình là 1 Array
    get() {
        return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
    },
    // set là để lưu lại, nó nhận todos
    set(todos) {
        // lưu lại
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    } 

}


// Sau khi set và get item trong local storage thì ta thêm xóa sửa item thì ta refresh lại trang nó ko bị mất nữa, ta có thể vào Devtool > Vào tab Application > ở thanh menu bên trái vùng Storage ta nhấn vào Local Storage > nhấn vào địa chỉ http của mình > nhìn sang vùng hiển thị kết quả bên phải (vùng màu trắng) > có Table gồm Key và Value > nhấn vào TODOS ờ cột Key > xem kết quả