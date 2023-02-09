function generateCode() {
    return Math.random().toString().substr(2, 5) + "_" + String(new Date().getTime()).substr(2, 5);
}


function format(inputDate) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${date}/${month}/${year}`;
}

// Lấy dữ liệu từ localStorage ra
// function getDataStorage(key="DANHSACHITEMCART"){
//     return JSON.parse(localStorage.getItem(key));
// }

// Lưu dữ liệu vào localStorage
// function setDataStorage(key, value){
//     if(!value){
//         console.error("key empty!!!!")
//     }
//     localStorage.setItem(key, JSON.stringify(value))
// }

// Xóa dữ liệu khỏi localStorage
function removeDataStorage(key) {
    localStorage.removeItem(key)
}

// Quay về trang mua hàng
function backToHome() {
    location.replace("http://127.0.0.1:5501/html/index.html")
}