import { createStore } from "./core.js";
// import thêm reducer nữa vì khi ta viêt createStore thì nó nhạn đối số là reducer
import reducer from "./reducer.js";
// import logger vào Store
import withLogger from './logger.js'

// createStore của ta lại trả ra 'attach, connect, dispatch' nên trong store.js lấy ra 'attach, connect, dispatch'
// gọi createStore thì nó sẽ return 'attach, connect, dispatch'
// vì 'logger' là thành phần trung gian nên nó ôm bên ngoài reducer 'withLogger(reducer)', khi reducer dc gọi mà withlogger (logger) nó ôm reducer như vậy thì nó sẽ bắt trạng thái của reducer.
// vì reducer là hàm, withlogger củng là hàm nên bản thân trong withLogger cũng return lại 1 hàm
// làm gì làm, mình vẫn phải viết 1 hàm mới ôm reducer mà nó trả ra đúng những cái createStore cần, khi mình ôm 1 hàm khác thì mình phải làm sao đảm báo là hàm đó dc gọi nó vẫn trả ra cái state 
const { attach, connect, dispatch } = createStore(withLogger(reducer))

// dispatch cần đạt biến global cho dê dùng, trong View cũng cần dispatch action nên cần đặt biến global
window.dispatch = dispatch

// export ra 'attach, connect'
export {
    attach,
    connect
}