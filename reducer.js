//  Ví dụ ứng dụng quản lý ô tô

// Tạo 1 giá trị khởi tạo
const init = {
    todos: [
        {
            title: 'Learn Javascript',
            completed: false
        },
        {
            title: 'Learn Python',
            completed: true
        }
    ]
}


// Ta có thể viết gọn hơn bằng cách tách ra như này thay vì dùng switch case
const actions = {
    // action 'add' nhận state và title 'add(state, title)'
    // Bởi vì Object trong JS có tính chất tham chiếu (reference) nên ko nhất thiết để trả ra state mới nên ta chỉ cần destructering nhận luôn todos vào 'add({ todos }, title)'
    add({ todos }, title) {
        // Viết logic của add

        // push thăng Object mới vào todos luôn
        // Sau khi đoạn 'actions[action] && actions[action](state, ...args)' dc thực thi thì nó push object mới vào totos 'todos.push({ title, completed: false })' và return lại state 'return state'
        todos.push({ title, completed: false })
    }
}

// Mặc định cho state = init
export default function reducer(state = init, action, args) {
    // console.log(action, args);

    // Kiểm tra cách viết gọn thay switch case của ta
    // Dùng toán tử logical, kiểm nếu có 'action' (vì tham số action là nó trùng cái action name của ta 'add') (actions[action]) thì chạy nó (actions[action]()) và truyền 2 đối số là 'state' và '...args' vào hàm chạy (actions[action](state, ...args))
    actions[action] && actions[action](state, ...args)

    // Mặc định vẫn return state như switch case
    return state;


    // Begin: Đoạn switch case ban đầu của ta (Ta chỉ cần bỏ chú thích ở các dòng có chữ CODE và bỏ luôn (CODE) thì sẽ ra code switch case của ta để định nghĩa các action action)
    // Lần đầu reduce bên file core.js dc gọi 'let state = reducer()' nó return ra giá trị init
    // (CODE)switch (action) {
        // Action thêm việc (ADD)
        // (CODE)case 'add':
            // args là data mà mình add vào (porsche)
            // Ta để ý là logger nó ghi log của ta sau khi ta nhập thông tin công việc và nhận Enter thì thông tin mình nhập nó sẽ đưa vào 1 Array nên ta nhận title là 'const [title] = args'
            // (CODE)const [title] = args
            // (CODE)return {
                // '...state' là thừa hưởng object cũ (là BMW)
                // Sau đó nó chỉnh sửa todos bằng cách thêm Object mới vào cuối Array, mà Object của ta ko phải là 1 chuỗi mà là 1 Object (nó phải tương tư các Object trog init). TRong Object của ta thì có title (thông tin công việc) và trạng thái completed mặc định false (chưa làm)
            // (CODE)    ...state,
            // (CODE)    todos: [...state.todos, {
            // (CODE)        title,
            // (CODE)        completed: false
            // (CODE)    }]
            // (CODE)}

            // Sau khi ta thêm action 'add' thì khi ban đầu chạy thì logger sẽ ghi:
            /**
             * undefined (là action name)
                rev State: undefined
                Action Arguments: undefined
                Next State: {todos: Array(2)} (vì giá trị khởi tạo (init) của ta là 2 phần tử và ở bước Next State nó load giá trị khởi tạo của ta)
            */

            // Khi ta nhập giá trị gì đó (Vd: join the class) vào thẻ input trên phần Header (nhập công việc cần làm) thì nó sẽ ghi lại log mới là: 
            /**
             * add (là action name 'add')
                Prev State: {todos: Array(2)} (nó lấy giá trị nextState của log củ làm giá trị preState của log mới)
                Action Arguments: ['join the class'] (là giá trị User nhập vào và nhấn Enter)
                Next State: {todos: Array(3)} (Vì ta đã viết action 'add' để thêm 1 argument vào todos của ta)
            */
            // Đồng thời ta sẽ thấy nó add thêm 1 item mới vào list (render UI)      

            // Sau đó ta nhập thêm 1 giá trị nữa (Vd: join the classroom) vào thẻ input trên phần Header (nhập công việc cần làm) thì nó sẽ ghi lại log mới là: 
            /**
             * add (là action name 'add')
                Prev State: {todos: Array(3)} (nó lấy giá trị nextState của log củ làm giá trị preState của log mới)
                Action Arguments: ['join the classroom'] (là giá trị User nhập vào và nhấn Enter)
                Next State: {todos: Array(4)} (Vì ta đã viết action 'add' để thêm 1 argument vào todos của ta)
            */
            // Đồng thời ta sẽ thấy nó add thêm 1 item mới vào list (render UI)

        // (CODE)default:
        // (CODE)    return state;
    // (CODE)}
    // End: Đoạn switch case ban đầu của ta

}