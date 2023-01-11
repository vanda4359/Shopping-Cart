function generateID() {
    return Math.random().toString().substr(2, 10) + "_" + String(new Date().getTime());
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

// Lấy dữ liệu ra
function getDataStorage(key="DANHSACHITEMCART"){
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
}

// Lưu dữ liệu vào localStorage
function setDataStorage(key, value){
    if(!value){
        console.error("key empty!!!!")
    }
    localStorage.setItem(key, JSON.stringify(value))
}