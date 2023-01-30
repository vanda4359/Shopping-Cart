
function handleGetOrderInfos() {
    fetch('https://63c0cc0f71656267186d4e0b.mockapi.io/api/orderInfos')
        .then((res) => {
            return res.json();
        })
        .then((orderData) => {
            console.log("orderData", orderData);

            let listOrderDataItems =
                orderData.map(function (order) {
                    // const billsPrice = 
                    return `<div class="item-bills">
                                <div class="col-sm-2 bills-code">
                                    ${order.code}
                                    <div class="bills-code-detail" onclick="seenDetail()">Details <i class="fa-sharp fa-solid fa-caret-down"></i></div>
                                </div>
                                <div class="col-sm-2 bills-customer-name">${order.fullname}</div>
                                <div class="col-sm-2 bills-date">${order.dateTime}</div>
                                <div class="col-sm-2 bills-No">${order.id}</div>
                                <div class="col-sm-1 bills-quantity">${order.listOrder.length}</div>
                                <div class="col-sm-2 bills-price">${order.totalPriceAll} đ</div>
                                <div class="col-sm-1 bills-action">
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </div> 
                            </div>`;
                })
            listOrderDataItems = listOrderDataItems?.join("")
            document.getElementById("bills-title").innerHTML = document.getElementById("bills-title").innerHTML + listOrderDataItems;
        })
        .catch(error => alert('Error:', error));
}
handleGetOrderInfos();

function seenDetail() {
    console.log(11111);
}