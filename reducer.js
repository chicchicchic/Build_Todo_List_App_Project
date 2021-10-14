// import localstorage
import storage from './util/storage.js'


//  Ví dụ ứng dụng todo List

// Tạo 1 giá trị khởi tạo
const init = {
    // init ban đầu
    // todos: [
    //     {
    //         title: 'Learn Javascript',
    //         completed: false
    //     },
    //     {
    //         title: 'Learn Python',
    //         completed: true
    //     }
    // ]

    // Lấy ra từ storage
    todos: storage.get(),
    // bộ lọc filter mặc định là tất cả (all)
    filter: 'all',
    // và filters chứa các điều kiện để lọc
    filters: {
        // ta có key 'all', khi có điều kiện lọc tất cả thì đơn giản là ta trả nó về true (mặc định là all)
        all: () => true,
        // khi ở trang thái 'active' thì nó nhận 'todo' và nó chỉ hiện thị ra item nào mà chưa complete (chưa hoàn thành)
        active: todo => !todo.completed,
        // ngược với trạng thái lọc 'active'
        completed: todo => todo.completed,   
    },
    // Edit index (mặc định null)
    editIndex: null,

}


// Ta có thể viết gọn hơn bằng cách tách ra như này thay vì dùng switch case
const actions = {
    // action 'add' nhận state và title 'add(state, title)'
    // Bởi vì Object trong JS có tính chất tham chiếu (reference) nên ko nhất thiết để trả ra state mới nên ta chỉ cần destructering nhận luôn todos vào 'add({ todos }, title)'
    add({ todos }, title) {
        // Check nếu có title (thông tin todo User nhập vào), nếu User ko nhập gì vào mà chỉ focus chuột vào ô input và Enter thì action vẫn chạy, tuy nhiên theo dõi bên log thì Action Arguments là rỗng và Next State ko tăng lên vì nó ko có thực hiện thêm vào khi User ko nhập gì mà Enter
        if(title) {
            // push thăng Object mới vào todos luôn
            // Sau khi đoạn 'actions[action] && actions[action](state, ...args)' dc thực thi thì nó push object mới vào totos 'todos.push({ title, completed: false })' và return lại state 'return state'
            todos.push({ title, completed: false })
    
            // Add vào storage, và truyền todos vào để nó lưu lại
            storage.set(todos)
        }
    },
    // action 'toggle' 
    // Đố số thứ nhất là 'todos', đối số thứ 2 là 'index' của mỗi item
    toggle({ todos }, index) {
        const todo = todos[index];
        // Đảo ngược chính nó, khi User check vào thì item dc gạch, còn khi User nhấn lại 1 cái thì item ko còn gạch nữa, và những thao tác này dc local storage lưu lại hết
        todo.completed = !todo.completed
        // lưu vào storage
        storage.set(todos)
    },
    // action 'toggleAll'
    // Đố số thứ nhất là 'todos', đối số thứ 2 là 'completed' của input (dấu mũi tên xuống)
    toggleAll({ todos }, completed) {
        // lặp qua todos, completed là trạng thái check bên ngoài truyền vào, bên ngoài truyền vào cái gì thì nó truyền hết cho item trong list
        todos.forEach(todo => todo.completed = completed);
        storage.set(todos)
    },
    // action 'destroy'
    destroy({ todos }, index) {
        // Xóa đi 1 item
        todos.splice(index, 1)
        storage.set(todos)
    },
    // action 'switchFilter'
    // Trong action này ta ko nhận todos nữa mà nhận state, vì state mới chọc vào dc filter của init, đối số thứ 2 là filter (filter mới)

    // Khi ta click vào bộ lọc có tên 'Active' trên UI thì logger sẽ ghi lại như sau:
    /**
     * switchFilter (là action name 'switchFilter')
            Prev State: {todos: Array(2), filter: "all"} (vì giá trị mặc định ban đầu của filter là 'all')
            Action Arguments: ["active"] (tên filter sau khi ta chuyển từ filter mặc định sang filter mới )
            Next State: {todos: Array(2), filter: "active"}
     */
    // Khi ta click filter 'Completed' trên UI thì logger sẽ ghi lại như sau:
    /**
     * switchFilter (là action name 'switchFilter')
            Prev State: {todos: Array(2), filter: "active"} (là tên filter trước đó)
            Action Arguments: ["completed"] (tên filter sau khi ta chuyển từ filter trước đó sang filter mới )
            Next State: {todos: Array(2), filter: "completed"}
     */
    switchFilter(state, filter) {
        state.filter = filter
    },
    // action 'clearCompleted'
    // ta cần đối số là state vì ta dùng state để gán lại todos và lọc theo điều kiện xóa bỏ tất cả todo item đã complete
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        // lưu lại state.todos và storage
        storage.set(state.todos)
    },
    // action 'startEdit'
    // Ban đầu logger sẽ ghi là:
    /**
     * undefined (là action name 'undefined')
            Prev State: undefined
            Action Arguments: undefined
            Next State: {todos: Array(2), editIndex: null}
     */
    // Sau khi nhấn đúp vào 1 item (Vd item thứ 3 trong List)
    /**
     * editStart (là action name 'editStart')
            Prev State: {todos: Array(2), editIndex: null}
            Action Arguments: [2]
            Next State: {todos: Array(2), editIndex: 2}
     */
    startEdit(state, index) {
        state.editIndex = index
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