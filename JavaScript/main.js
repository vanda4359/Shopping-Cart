
let listData = [
    {
        id: "1",
        name: "Iphone 12",
        price: 10000000,
        quantity: 2,
        image: "../img/Iphone 12.webp"
    },
    {
        id: "2",
        name: "Iphone 12 Pro",
        price: 12000000,
        quantity: 5,
        image: "../img/Iphone 12 Pro.webp"
    },
    {
        id: "3",
        name: "Iphone 12 Promax",
        price: 13000000,
        quantity: 5,
        image: "../img/Iphone 12 Promax.webp"
    },
    {
        id: "4",
        name: "Iphone 13",
        price: 15000000,
        quantity: 8,
        image: "../img/Iphone 13.webp"
    },
    {
        id: "5",
        name: "Iphone 13 Pro",
        price: 17000000,
        quantity: 8,
        image: "../img/Iphone 13 Pro.webp"
    },
    {
        id: "6",
        name: "Iphone 13 Promax",
        price: 19000000,
        quantity: 8,
        image: "../img/Iphone 13 Promax.webp"
    },
    {
        id: "7",
        name: "Iphone 14",
        price: 20000000,
        quantity: 6,
        image: "../img/Iphone 14.webp"
    },
    {
        id: "8",
        name: "Iphone 14 Plus",
        price: 22000000,
        quantity: 6,
        image: "../img/Iphone 14 Plus.webp"
    },
    {
        id: "9",
        name: "Iphone 14 Pro",
        price: 26000000,
        quantity: 5,
        image: "../img/Iphone 14 Pro.webp"
    },
    {
        id: "10",
        name: "Iphone 14 Promax",
        price: 30000000,
        quantity: 6,
        image: "../img/Iphone 14 Promax.webp"
    },
];

const keyLocalStorageListSP = "DANHSACHSP";

const keyLocalStorageItemCart = "DANHSACHITEMCART";

const listProduct = app.getData(keyLocalStorageListSP) || [];

if (listProduct?.length === 0) {
    app.saveData(keyLocalStorageListSP, listData) ;
} 

// Chuyển danh sách sản phẩm thành HTML
unitUI();

function unitUI() {
    // let listProduct = getDataStorage(keyLocalStorageListSP)
    let newHTML = listProduct?.map(function (product) {
        return `<div class="item">
                <div class="item-thumb">
                    <img src="${product.image}" alt="">
                </div>
                <h2 class="item-name">${product.name}</h2>
                <div class="item-title">
                    <div class="item-price">${product.price.toLocaleString('en-US')} đ</div>
                    <div class="item-quanlity">${product.quantity} cái </div>
                </div>
                ${product.quantity > 0 
                    ? `<button onclick="handleAddToCart(${product.id}, ${product.quantity})" class="btn btn-add">Thêm vào giỏ hàng</button>` 
                    : `<button class="btn btn-add" disabled>Thêm vào giỏ hàng</button>`
                }
            </div>`;
    })
    newHTML = newHTML.join("")
    document.getElementById("items-id").innerHTML = newHTML;
};

// Tạo đối tượng Item giỏ hàng
function addProduct(idSP, quantityAdd) {
    let itemCart = {};
    itemCart.idSP = idSP;
    itemCart.quantityAdd = quantityAdd;

    return itemCart;
}


// Lấy danh sách item giỏ hàng

const listItemCart = app.getData(keyLocalStorageItemCart) || [];


function handleAddToCart(id) {

    const indexOfItemOfListCart = listItemCart.findIndex((item) => item.idSP.toString() === id.toString());
    const indexOfItemListProduct = listProduct.findIndex((item) => item.id.toString() === id.toString());

    if (indexOfItemOfListCart >= 0) {
        listItemCart[indexOfItemOfListCart].quantityAdd++;
    } else {
        const itemCart = addProduct(id, 1);
        listItemCart?.push(itemCart);
    }
    listProduct[indexOfItemListProduct].quantity -= 1;
    // Lưu trữ vào localStorage
    app.saveData(keyLocalStorageItemCart, listItemCart); 
    app.saveData(keyLocalStorageListSP, listProduct);
    unitUI();
}