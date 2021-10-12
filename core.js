
// File core.js nó chỉ tạo store chứ no ko phải là store và nhận reducer() để tạo ra giá trị của state ban đầu

// Truyền vào func [] trong bài Destructuring (ES6)
export default function html([first, ...strings], ...values) {
    // 2 tham số trong reduce là acc (biến tích trữ) và cur (current value)
    return values.reduce(
        // Giá trị khởi tạo là chính Array của first
        // Lần đầu func trong reduce dc gọi thì acc là [first]
        // ...values là nó lưu những giá trị trong biến nội suy trong thẻ ul
        // Nối cur và những phần tử còn lại và bỏ đi phần tử đầu (shift()), concat nó sẽ nối và nó làm phẳng array thành cùng 1 cấp
        (acc, cur) => acc.concat(cur, strings.shift()), 
        [first]
    )    
    .filter(x => x && x !== true || x === 0 )
    .join('')

    // Kết quả: tại biến nội suy của file 'javascript' ta truyền vào true/false/null/undefined thì console ra sẽ thấy nó loại bò dc, còn nếu truyền số 0 vào thì nó nhận
}

// Nguyên tắc là cứ createStore thì nhận 1 giá trị là reducer nên truyền vào tham số đặt tên là reducer
export function createStore(reducer) {
    let state = reducer()

    // Root nó sẽ chứa những gốc element và để render ra View
    // Map là 1 object đặc biệt
    const roots = new Map()

    // Function để render
    function render() {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        // attach là để nó nhận cái view và đỗ vào 'root' ở file index.html
        // ko viết theo kiểu 'attach: function{}' này nữa mà viết theo Object literal để viết ngắn hơn (attach() {})
        // attach với tham số đầu tiên là component và tham số thứ 2 là root element
        attach(component, root) {
            // Khi set xong thì biến 'roots' có dữ liệu, roots có dữ liệu rồi sẽ Map vào render
            roots.set(root, component)
            // Sau khi set xong thì render lại luôn
            render()
        },
        // Cần 1 function để kết nối giữa Store và View (connect)
        // Vì view thì sẽ có nhìu màn hình chứ ko phải 1, ví dụ ở trng Home thì ta chỉ cần 1 vài dữ liệu để show ra thôi nên đặt vào tham số 'selector' để lựa chọn dữ liệu cụ thể trong Store nhưng mặc định là nó sẽ return  ra giá trị chính cái state của ta luôn. Đặt mặc định nó là 1 func có tham số 'state' và return ra chính nó. Nếu ko truyền state thì lấy giá trị mặc định, còn nếu mình truyền đối số thì lấy giá trị truyền vào stote 
        connect(selector = state => state) {
            return component => (props, ...args) =>
                // props và args đều là object, nên mình dùng Object.assign sẽ giúp mình merge hết vào. Đầu tiên mình sẽ tạo 1 Object mói, sau đó là merge props vào object mới, sau đó gọi selector và truyền state vào, vì selector nhận 1 đối số và return lại đối số đó nên mình viết 'selector(state)' thì sau này còn truyền selector vào, cuối cùng merge thêm '...args' vào nữa, sau này args có giá trị gì thì cũng đẩy hết vào component của mình
                component(Object.assign({}, props, selector(state), ...args)) 
        },
        // Sau này View nó muốn thực hiện hành động gì đó thì nó phải dispatch, nên ta tạo thêm 1 func dispatch
        // dispatch nó thực hiện hành động gì đó nên nó sẽ nhận 1 mô tả action và đẫy sang cho reducer và nó có thẻ đi kèm những dữ liệu (Vd: thêm thì nó sẽ đẩy những dự liệu cần thêm, xóa thí nó đẩy index hay những gì cần xóa...) nên ta nhận tất cả agrs của nó (...agrs)
        dispatch(action, ...agrs) {
            // Khi dispatch dc thực thi thì gọi reducer
            // Bản chất reduce là nhận giá trị lần trước đã return , và sau đó nhận action, vả cuối cùng là truyền 'agrs' vào
            // Ban đầu state của mình sẽ là 'let state = reducer()', sau đó mình dispatch 1 action gì đó thì truyền action, sau đó reducer dựa vào action đi sửa state của mình và return lại 1 state mới thì khi đó Store dc update lại, khi Store update lại thì View mình sẽ thay đổi nên ta gọi hàm render()
            // reducer ở đầy nó sẽ nhận state cũ 'state' và nó chỉnh sửa 'action' (kèm data đi kèm khi chỉnh sửa 'agrs') và gán nó = state mới 'state' và render ra ngoài
            state = reducer(state, action, agrs)
            render()
        }

    }
}

// Cách dùng thư viện ta vừa tạo ra:
// Để dùng thư viện này thì ta luôn phải tạo ra 2 file, store.js và reducer.js
// store.js là để chứa cái state của mỉnh
// reducer.js là để nhận action đề xử lý bên reducer này