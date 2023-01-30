// Thêm dữ liệu
function handleCreateOrderInfos(data) {
    fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .then((orderData) => {
            console.log(orderData);
            closeModal();
            testCart();  
        })
        .catch(error => alert('Error:', error));
}

// Lấy dữ liệu
// function handleGetOrderInfos() {
//     fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos')
//         .then((res) => {
//             return res.json();
//         })
//         .then((orderData) => {
//             return orderData
//         })
// }

// console.log(1111, handleGetOrderInfos());

// Sửa dữ liệu
function handleEditOrderInfos(data) {
    fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos/'+ data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
        .then((res) => {
            return res.json();
        })
        .then((orderData) => {
            console.log(orderData);
        })
        .catch(error => alert('Error:', error));
}

// Xóa dữ liệu
function handleDeleteOrderInfos(data) {
    fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos/'+ data.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
        .then((res) => {
            return res.json();
        })
        .then((orderData) => {
            console.log(orderData);
        })
        .catch(error => alert('Error:', error));
}