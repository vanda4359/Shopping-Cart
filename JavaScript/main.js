// Bài 1
var listData = [
    {
        id: 1,
        name: "Iphone 12",
        price: 10000000,
        quantity: 2000,
        image: "../img/Iphone 12.webp"
    },
    {
        id: 2,
        name: "Iphone 12 Pro",
        price: 12000000,
        quantity: 500,
        image: "../img/Iphone 12 Pro.webp"
    },
    {
        id: 3,
        name: "Iphone 12 Promax",
        price: 13000000,
        quantity: 50,
        image: "../img/Iphone 12 Promax.webp"
    },
    {
        id: 4,
        name: "Iphone 13",
        price: 15000000,
        quantity: 80,
        image: "../img/Iphone 13.webp"
    },
    {
        id: 5,
        name: "Iphone 13 Pro",
        price: 17000000,
        quantity: 80,
        image: "../img/Iphone 13 Pro.webp"
    },
    {
        id: 6,
        name: "Iphone 13 Promax",
        price: 19000000,
        quantity: 80,
        image: "../img/Iphone 13 Promax.webp"
    },
    {
        id: 7,
        name: "Iphone 14",
        price: 24000000,
        quantity: 60,
        image: "../img/Iphone 14.webp"
    },
    {
        id: 8,
        name: "Iphone 14 Promax",
        price: 30000000,
        quantity: 60,
        image: "../img/Iphone 14 Promax.webp"
    },
];

var keyLocalStorageListSP = "DANHSACHSP";

var keyLocalStorageItemCart = "DANHSACHITEMCART"

// Bài 2
setDataStorage(keyLocalStorageListSP, listData);

// Bài 3
var getListData = getDataStorage(keyLocalStorageListSP);

// Chuyển danh sách sản phẩm thành HTML
unitUI();

function unitUI() {
    // let getListData = getDataStorage(keyLocalStorageListSP)
    let newHTML = getListData.map(function (product) { 
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
    newHTML = newHTML.join("")
    document.getElementById("items-id").innerHTML = newHTML;  
};

// Bài 4

// Tạo đối tượng Item giỏ hàng
function addProduct(idSP, quantityAdd) {
    let itemCart = {};
    itemCart.idSP = idSP;
    itemCart.quantityAdd = quantityAdd;

    return itemCart;
}
 
// Lưu trữ danh sách Item giỏ hàng
// setDataStorage(keyLocalStorageItemCart, listItemCart);

function setListItemCart(listItemCart) {
    let jsonListItemCart = JSON.stringify(listItemCart);

    localStorage.setItem(keyLocalStorageItemCart, jsonListItemCart)
}

function handleAddToCart(idSP) {
    alert("Bạn muốn thêm vào giỏ hàng" + idSP)

    let listItemCart = getDataStorage(keyLocalStorageItemCart);

    let existInListItemCart = false;
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