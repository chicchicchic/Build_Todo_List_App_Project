//  Ví dụ ứng dụng quản lý ô tô

// Tạo 1 giá trị khởi tạo
const init = {
    
}


// Mặc định cho state = init
export default function reducer(state = init, action, agrs) {
    // console.log(action, agrs);

    // Lần đầu reduce bên file core.js dc gọi 'let state = reducer()' nó return ra init 'const init = {cars: ['BMW']}
    switch (action) {
        // Action thêm ô tô (ADD)
        case 'ADD':
            // agrs là data mà mình add vào (porsche)
            // Vì agrs nằm trong Array (console.log(action, agrs) sẽ thấy nó thêm 'porsche' và đưa vào Array) nên ta 'const [newCar] = agrs'
            const [newCar] = agrs
            return {
                // '...state' là thừa hưởng object cũ (là BMW)
                // Sau đó nó chỉnh sửa cars bằng cách thêm Object mới vào (newCar) vào cuối Array
                cars: [...state.cars, newCar]
            }

        default:
            return state;
    }
}