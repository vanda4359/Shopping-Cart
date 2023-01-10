// Bài 1
var listData = [
    {
        id: 1,
        name: "Iphone 12",
        price: 10000000,
        quantity: 2000,
        image: "./img/Iphone 12.webp"
    },
    {
        id: 2,
        name: "Iphone 12 Pro",
        price: 12000000,
        quantity: 500,
        image: "./img/Iphone 12 Pro.webp"
    },
    {
        id: 3,
        name: "Iphone 12 Promax",
        price: 13000000,
        quantity: 50,
        image: "./img/Iphone 12 Promax.webp"
    },
    {
        id: 4,
        name: "Iphone 13",
        price: 15000000,
        quantity: 80,
        image: "./img/Iphone 13.webp"
    },
    {
        id: 5,
        name: "Iphone 13 Pro",
        price: 17000000,
        quantity: 80,
        image: "./img/Iphone 13 Pro.webp"
    },
    {
        id: 6,
        name: "Iphone 13 Promax",
        price: 19000000,
        quantity: 80,
        image: "./img/Iphone 13 Promax.webp"
    },
    {
        id: 7,
        name: "Iphone 14",
        price: 24000000,
        quantity: 60,
        image: "./img/Iphone 14.webp"
    },
    {
        id: 8,
        name: "Iphone 14 Promax",
        price: 30000000,
        quantity: 60,
        image: "./img/Iphone 14 Promax.webp"
    },
];

var keyLocalStorageListSP = "DANHSACHSP";

var keyLocalStorageItemCart = "DANHSACHITEMCART"

// Bài 2

var saveListData = localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData))

// Bài 3

var getListData = JSON.parse(localStorage.getItem(keyLocalStorageListSP));

// Chuyển danh sách sản phẩm thành HTML
// function convertListProductToHTML(getListData) {


var newHTML = getListData.map(function (product) {

    return `<div class="item">
            <div class="item-thumb">
                <img src="${product.image}" alt="">
            </div>
            <h2 class="item-name">${product.name}</h2>
            <div class="item-title">
                <div class="item-price">${product.price} đ</div>
                <div class="item-quanlity">${product.quantity} cái </div>
            </div>
            <button  onclick="handleAddToCart(${product.id})" class="btn btn-add">Thêm vào giỏ hàng</button>
        </div>`;

})
var newHTML = newHTML.join("")
document.getElementById("items-id").innerHTML = newHTML;

// var HTMLListProduct = `<div class="items">`;

// for (let i = 0; i < getListData.length; i++) {
//     var product = getListData[i];
//     var htmlProduct = convertProductToHTML(product);
//     HTMLListProduct = HTMLListProduct + htmlProduct;
// }

// HTMLListProduct = HTMLListProduct + `</div>`;

// return HTMLListProduct;
// }


// Chuyển 1 đối tượng sản phẩm thành HTML
// function convertProductToHTML(product) {
//     var html = ``;
//     html += `<div class="item">`
//     html += `<div class="item-thumb">`
//     html += `<img src="`+ product.image +`" alt="">`
//     html += `</div>`
//     html += `<h2 class="item-name">`+ product.name +`</h2>`
//     html += `<div class="item-title">`
//     html += `<div class="item-price">`+ product.price +` đ</div>`
//     html += `<div class="item-quanlity">`+ product.quantity +` cái </div>`
//     html += `</div>`
//     html += `<button onclick="handleAddToCart(`+ product.id +`)" class="btn btn-add">Thêm vào giỏ hàng</button>`
//     html += `</div>`

//     return html;
// }

// Bài 4

// function accessProductToId() {
//     for (let i = 0; i < getListData.length; i++) {
//         var productNow = getListData[i];
//         if( productNow.id == id) {
//             return productNow
//         }
//     }
// }
// Tạo đối tượng Item giỏ hàng
function addProduct(idSP, quantityAdd) {
    var itemCart = new Object();
    itemCart.idSP = idSP;
    itemCart.quantityAdd = quantityAdd;

    return itemCart;
}

// Lấy ra toàn bộ Item giỏ hàng
function getListItemCart() {
    var listItemCart = new Array();

    var jsonListItemCart = localStorage.getItem(keyLocalStorageItemCart);

    if (jsonListItemCart != null) {
        var listItemCart = JSON.parse(jsonListItemCart);
    }
    console.log(listItemCart);

    return listItemCart;
}
 
// Lưu trữ danh sách Item giỏ hàng
function setListItemCart(listItemCart) {
    var jsonListItemCart = JSON.stringify(listItemCart);

    localStorage.setItem(keyLocalStorageItemCart, jsonListItemCart)
}

function handleAddToCart(idSP) {
    alert("Bạn muốn thêm vào giỏ hàng" + idSP)

    var listItemCart = getListItemCart();

    var existInListItemCart = false;
    for (let i = 0; i < listItemCart.length; i++) {
        const itemCartNow = listItemCart[i];

        // nếu tồn tại thì tăng số lượng 
        if (itemCartNow.idSP === idSP) {
            listItemCart[i].quantityAdd++;
            existInListItemCart = true;
        }
    }

    // Nếu ko tồn tại thì thêm vào trong danh sách 
    if (!existInListItemCart) {
        const itemCart = addProduct(idSP, 1);
        listItemCart.push(itemCart);
    }

    // Lưu trữ vào localStorage
    setListItemCart(listItemCart);
}