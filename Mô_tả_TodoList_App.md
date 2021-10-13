# Build_Todo_List_App_Project
Xây dựng todo list từ library hoạt động như react + redux mà ta code ờ bài trước


Mô tả:
* Header component
- Ở phần header ta có 1 ô input, khi ta nhâp công việc của mình và Enter thì nó sẽ dc thêm vào List bên dưới
- Cái arrow down(dấu mủi tên xuống) khi ta click vào thì nó check tất cả item của ta hoặc bỏ check tất cà item của ta

* TodoList và TodoItem 
(là các item của List của ta)
-Khi ta click đúp vào các Item thì nó sẽ hiện dạng có thẻ chỉnh sửa thông tin Item, sau khi sửa xong nhấn Enter thì nó sẽ update lại thông tin của item

* Footer component
- chổ '<Số lượng>+item left' là những item mình chưa làm xong (chưa làm xong nên chưa dc đánh dấu check)
- Chổ 'All/Active/Completed' là bộ lọc, All là lọc cả việc chưa xong và viêc đã làm xong, Active là lọc những công việc đang làm (chưa hoàn thành), Completed là lọc những việc đã hoàn thành (đã đánh dấu check)
- chỗ 'Clear Completed' là xóa tất cả những Item đã đánh dấu check (đã hoàn thành) khỏi list của mình, ngoài ra mình cũng có thể hover vào từng item (cả Active và Completed) thi nó sẽ hiện dấu X khi hover vào và mình có thẻ xóa item nào mà mình muốn xóa'

(Phần TodoList và TodoItem và Footer là mặc định ẩn khi ko có item nào trong List)
