var keyLocalStorageItemCart = "DANHSACHITEMCART"

// Lấy ra toàn bộ Item giỏ hàng
function getListItemCart() {
    var listItemCart = new Array();

    var jsonListItemCart = localStorage.getItem(keyLocalStorageItemCart);

    if (jsonListItemCart != null) {
        var listItemCart = JSON.parse(jsonListItemCart);
    }
    return listItemCart;
}

// Lưu trữ danh sách Item giỏ hàng
function setListItemCart(listItemCart) {
    var jsonListItemCart = JSON.stringify(listItemCart);

    localStorage.setItem(keyLocalStorageItemCart, jsonListItemCart)
}

var listItemCart = getListItemCart();

// Lấy ra toàn bộ sản phẩm 

var listProduct = JSON.parse(localStorage.getItem("DANHSACHSP"));

// Tạo ra list sản phẩm giỏ hàng
function createListProductCart(listProductCart) {
    var listProductCart = listItemCart.map(item => {
        const findItem = listProduct.find(e => e.id === item.idSP);

        return {
            ...findItem,
            soLuong: item.quantityAdd,
        }
    })

    return listProductCart;
}

var listProductCart = createListProductCart();

var newHTMLCart = listProductCart.map(function (product) {
    let totalProduct = product.price * product.soLuong;

    return `<div class="item-cart">
                <div class="product-name">
                    <div class="image">
                        <img src="${product.image}" >
                    </div>
                    <div class="name-title">
                        <p class="name bold">${product.name}</p>
                        <div class="quantity-now">Quantity: ${product.quantity}</div>
                    </div>
                </div>
                <div class="quantity">
                    <div class="decrease-quantity" onclick="handleDecrease(event, ${product.id})"><i class="fa-solid fa-minus"></i></div>
                    <div class="quantity-add">${product.soLuong}</div>
                    <div class="increase-quantity" onclick="handleIncrease(event, ${product.id})"><i class="fa-solid fa-plus"></i></div>
                </div>
                <div class="price"> ${product.price} đ</div>
                <p class="totalMoney"> ${totalProduct} đ</p>
                <div class="action" onclick="closeItemCart(event, ${product.id})">
                    <i class="fa-regular fa-circle-xmark"></i>
                </div>
            </div>`;

})
var newHTMLCart = newHTMLCart.join("")
document.getElementById("cart-title").innerHTML = document.getElementById("cart-title").innerHTML + newHTMLCart;


function total() {
    let totalListProduct = 0;
    listProductCart.forEach(product => {
        totalListProduct += product.price * product.soLuong;
    })
    document.getElementById("totalMoney-all").innerHTML = `<div class="bold">Total: ${totalListProduct} đ</div>`;
}
total(listProductCart);

// giảm số lượng đặt hàng của từng sản phẩm
function handleDecrease(event, id) {

    let elementQuantity = event.target.closest(".item-cart").querySelector(".quantity-add");
    var listItemCart = getListItemCart();

    let elementTotalMoney = event.target.closest(".item-cart").querySelector(".totalMoney");
    var listProductCart = createListProductCart();

    let elementTotalMoneyAll = event.target.closest(".cart").querySelector("#totalMoney-all");


    for (let i = 0; i < listItemCart.length; i++) {
        const itemCartNow = listItemCart[i];
        const productCartNow = listProductCart[i];
    
        // nếu tồn tại thì giảm số lượng 
        if (itemCartNow.idSP === id) {
            let currentQuantity = listItemCart[i].quantityAdd - 1;
            listItemCart[i].quantityAdd = currentQuantity;
            elementQuantity.innerText = currentQuantity;

            if (productCartNow.id === id) {
                let currentTotalMoney = currentQuantity * listProductCart[i].price;
                elementTotalMoney.innerText = currentTotalMoney;
                console.log(11111);
            }
        }

    }

    // Lưu trữ vào localStorage
    setListItemCart(listItemCart);
}

// giảm số lượng đặt hàng của từng sản phẩm
function handleIncrease(event, id) {
    let element = event.target.closest(".item-cart").querySelector(".quantity-add");
    var listItemCart = getListItemCart();

    let elementTotalMoney = event.target.closest(".item-cart").querySelector(".totalMoney");
    var listProductCart = createListProductCart();

    for (let i = 0; i < listItemCart.length; i++) {
        const itemCartNow = listItemCart[i];
        const productCartNow = listProductCart[i];

        // nếu tồn tại thì tăng số lượng 
        if (itemCartNow.idSP === id) {
            let currentQuantity = listItemCart[i].quantityAdd + 1;
            listItemCart[i].quantityAdd = currentQuantity;
            element.innerText = currentQuantity;

            if (productCartNow.id === id) {
                let currentTotalMoney = currentQuantity * listProductCart[i].price;
                elementTotalMoney.innerText = currentTotalMoney;
            }
        }
    }

    // Lưu trữ vào localStorage
    setListItemCart(listItemCart);
}

// Xóa sản phẩm của giỏ hàng
function closeItemCart(event, id) {
    alert('Bạn có chắc chắn muốn xóa:' + id);
    console.log("event", event.target.closest(".cart").querySelector("#totalMoney-all"));

    var listItemCart = getListItemCart();
    const listItemCartNow = listItemCart.filter(item => item.idSP !== id);

    setListItemCart(listItemCartNow);

    let element = event.target.closest(".item-cart");
    element.remove();

    // render ra tổng tiền
    // let elementTotalMoneyAll = event.target.closest(".cart").querySelector("#totalMoney-all");
    // var listProductCart = createListProductCart();
    // let totalListProduct = 0;
    // listProductCart.forEach(product => {
    //     totalListProduct += product.price * product.soLuong;
    // })
    
    // elementTotalMoneyAll.innerText = totalListProduct;
    var listProductCart = createListProductCart(listProductCart)

    total(listProductCart)
}


// Lấy thông tin khách hàng 

// Lấy thông tin tỉnh, huyện xã để đổ ra giao diện
function openModal() {
    document.getElementById('modal').style.display = 'flex';

    const getProvinceData = fetch('https://provinces.open-api.vn/api/p')
        .then((res) => {
            return res.json();
        })
        .then((provinceData) => {
            let listProvinceItems = `<option value="">--Chọn Tỉnh/ Thành phố--</option>` +
                provinceData.map(function (province) {
                    return `<option value=${province.code}>${province.name}</option>`;
                })
            document.getElementById('province').innerHTML = listProvinceItems;
        })
        .catch(error => alert('Error:', error));
}

function closeModal() {
    document.getElementById('modal').style.display = 'none'
}

function onChangeProvince() {
    const provinceValue = document.getElementById("province").value;

    const getDistrictData = fetch('https://provinces.open-api.vn/api/d')
        .then((res) => {
            return res.json();
        })
        .then((districtData) => {
            const getDistrictByProvinceID = districtData.filter((item) => item.province_code.toString() === provinceValue)

            let listDistrictItems = `<option value="">--Chọn Quận/ Huyện--</option>` +
                getDistrictByProvinceID.map(function (district) {

                    return `<option value=${district.code}>${district.name}</option>`;
                })
            document.getElementById('district').innerHTML = listDistrictItems;

        })
        .catch(error => alert('Error: abc', error));
}

function onChangeDistrict() {
    const districtValue = document.getElementById("district").value;

    const getWardData = fetch('https://provinces.open-api.vn/api/w')
        .then((res) => {
            return res.json();
        })
        .then((wardData) => {
            const getWardByDistrictID = wardData.filter((item) => item.district_code.toString() === districtValue);
            let listWardItems = `<option value="">--Chọn Xã/ Phường--</option>` +
                getWardByDistrictID.map(function (ward) {

                    return `<option value=${ward.code}>${ward.name}</option>`;
                })
            document.getElementById('ward').innerHTML = listWardItems;
        })
        .catch(error => alert('Error: abc', error));
}
