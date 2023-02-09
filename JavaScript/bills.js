
var orderList = [];

initUIBills();

async function initUIBills() {
    orderList = await app.handleGetOrderInfos()

    let listOrderDataItemsHTML = 
                `<tr class="item-bills bold">
                    <th class="col-sm-2 bills-code bold">Code</th>
                    <th class="col-sm-2 bills-customer-name bold">Customer Name</th>
                    <th class="col-sm-2 bills-date bold">Date</th>
                    <th class="col-sm-2 bills-No bold">Item Numbers</th>
                    <th class="col-sm-1 bills-quantity bold">Total Quantity</th>
                    <th class="col-sm-2 bills-price bold">Total Price</th>
                    <th class="col-sm-1 bills-action bold">Return</th>
                </tr>` + 
                orderList.map(function (order) {
                    return `<tr class="item-bills">
                    <td class="col-sm-2 bills-code">
                        ${order.code}
                        <div class="bills-code-detail" onclick="seenDetail(${order.id})">
                        Details <i class="fa-sharp fa-solid fa-caret-down"></i></div>
                    </td>
                    <td class="col-sm-2 bills-customer-name">${order.fullname}</td>
                    <td class="col-sm-2 bills-date">${order.dateTime}</td>
                    <td class="col-sm-2 bills-No">${order.id}</td>
                    <td class="col-sm-1 bills-quantity">${order.listOrder.length}</td>
                    <td class="col-sm-2 bills-price">${order.totalPriceAll.toLocaleString('en-US')} đ</td>
                    <td class="col-sm-1 bills-action" onclick="deleteOrder(event, ${order.id})">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </td> 
                </tr>`;
                })?.join("")
            document.getElementById("bills-title").innerHTML = listOrderDataItemsHTML;

    // orderList.then((data) => console.log(111, data))
}

function deleteOrder(event, id) {
    const confirmDeleteOrder = confirm("Bạn có chắc chắn muốn xóa" + id)
    if (confirmDeleteOrder == true) {
        let element = event?.target.closest(".item-bills");
     
        element.remove();
    
        let record = orderList.find(item => parseInt(item.id) === id)
    
        app.handleDeleteOrderInfos(record);

    }

}

function seenDetail(id) {
    document.getElementById("modal").style.display = 'flex';

    let record = orderList.find(item => parseInt(item.id) === id)

    let productOrderDetailHTML = `<tr class="modal__order-container-item bold">
                            <th class="col-xs-6 product-name bold">
                                Product Name
                            </th>
                            <th class="col-xs-2 quantity bold">
                                Quantity
                            </th>
                            <th class="col-xs-2 price bold">Subtotal</th>
                            <th class="col-xs-2 totalPrice bold">Total</th>

                        </tr>` + 
                        record.listOrder.map(function(productOrderData) {
                            let totalProductOrderData = productOrderData.soLuong * productOrderData.price;
                            return `<tr class="modal__order-container-item">
                                        <td class="col-xs-6 product-name">
                                            <div class="image">
                                                <img src="${productOrderData.image}" >
                                            </div>
                                            <div class="name-title bold">
                                                ${productOrderData.name}
                                            </div>
                                        </td>
                                        <td class="col-xs-2 quantity">
                                            <div class="quantity-add">${productOrderData.soLuong}</div>   
                                        </td>
                                        <td class="col-xs-2 price">${productOrderData.price.toLocaleString('en-US')} đ</td>
                                        <td class="col-xs-2 totalPrice">${totalProductOrderData.toLocaleString('en-US')} đ</td>
                                    </tr>`;
                        })?.join("");
    document.getElementById("modal__order-container").innerHTML = productOrderDetailHTML;
}

function closeModal() {
    document.getElementById("modal").style.display = 'none';
}
