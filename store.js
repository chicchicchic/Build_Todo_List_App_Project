import { createStore } from "./core.js";
// import thêm reducer nữa vì khi ta viêt createStore thì nó nhạn đối số là reducer
import reducer from "./reducer.js";

// createStore của ta lại trả ra 'attach, connect, dispatch' nên trong store.js lấy ra 'attach, connect, dispatch'
// gọi createStore thì nó sẽ return 'attach, connect, dispatch'
const { attach, connect, dispatch } = createStore(reducer)

// dispatch cần đạt biến global cho dê dùng, trong View cũng cần dispatch action nên cần đặt biến global
window.dispatch = dispatch

// export ra 'attach, connect'
export {
    attach,
    connect
}