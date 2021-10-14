// File này có tác dụng để ghi log, ví dụ như trạng thái trước khi dispatch và sau khi dispatch của việt thêm item khi user nhập vào input và nhấn Enter thì 'onkeyup' sẽ bắt dc event dispatch action của User, file logger này sẽ cho ta thấy trang thái trước và sau khi action dc dispatch
export default function logger(reducer) {
    // return lại hàm khác
    // trong hàm mà nó return thì nó cũng phải nhận những đối số giống reducer
    // 'prevState' là state trc đó
    return (prevState, action, args) => {
        // nhóm lại theo action (console.group(action)), và end group (console.groupEnd()), khi này thì mình nhấn phím Enter là sẽ thấy nó log ra 'add' (là cái action mà ta đã bắt sự kiện bên attribute 'onkeyup' ở file Header.js)
        console.group(action);

        // ghi log 'prevState'
        console.log('Prev State: ', prevState);

        // ghi log 'Arguments'
        console.log('Action Arguments: ', args);

        // 'prevState' và 'nextState' chỉ là để ghi log lại state củ và state mới để mình nhìn thấy thôi
        const nextState = reducer(prevState, action, args)

        // ghi log 'nextState'
        console.log('Next State: ', nextState);

        // End group log 'action'
        console.groupEnd()
        return nextState

        
    }
}

// Khi ta vừa run lần đầu tiên nó hiện:
/**
 * undefined (là action name)
    rev State: undefined
    Action Arguments: undefined
    Next State: {todos: Array(2)} (vì giá trị khởi tạo (init) của ta là 2 phần tử và ở bước Next State nó load giá trị khởi tạo của ta)
 */


// Khi ta nhập giá trị gì đó (Vd: join the meeting) vào thẻ input trên phần Header (nhập công việc cần làm) thì nó sẽ ghi lại log mới là: 
/**
 * add (là action name 'add')
    Prev State: {todos: Array(2)} (nó lấy giá trị nextState của log củ làm giá trị preState của log mới)
    Action Arguments: ['join the meeting'] (là giá trị User nhập vào và nhấn Enter)
    Next State: {todos: Array(2)} (đáng lẽ nextState nó là '{todos: Array(3)}' vì dc User thêm 1 giá trị 'join the meeting' vào todos nhưng do ta chưa viết hàm 'add' để thêm vào nên nó vẫn hiện là '{todos: Array(2)}')
 */

