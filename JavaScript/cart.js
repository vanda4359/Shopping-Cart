let keyLocalStorageListSP = "DANHSACHSP";

let keyLocalStorageItemCart = "DANHSACHITEMCART"

let listItemCart = getDataStorage(keyLocalStorageItemCart);
let listProduct = getDataStorage(keyLocalStorageListSP);

testCart()


// kiểm tra giỏ hàng
function testCart() {

    if (listItemCart.length > 0) {
        document.getElementById('cart').style.display = "block";
        document.getElementById('cart-empty').style.display = "none";
    } else {
        document.getElementById('cart').style.display = "none";
        document.getElementById('cart-empty').style.display = "block";
    }
}

// Tạo ra list sản phẩm giỏ hàng
function getListProductCart() {

    let listProductCart = listItemCart?.map(item => {
        const findItem = listProduct.find(e => e.id?.toString() === item.idSP?.toString());
        return {
            ...findItem,
            soLuong: item.quantityAdd,
        }
    })
    return listProductCart;
}

let listProductCart = getListProductCart();
initUI();
function initUI() {

    let newHTMLCart = listProductCart.map(function (product) {
        let totalProduct = product.price * product.soLuong;
        return `<div class="item-cart">
            <div class="product-name">
                <div class="image">
                    <img src="${product.image}" >
                </div>
                <div class="name-title">
                    <p class="name bold" >${product.name}</p>
                    <div class="quantity-now">Quantity: ${product.quantity}</div>
                </div>
            </div>
            <div class="quantity">
                <button class="decrease-quantity" onclick="handleDecrease(event, ${product.id})" ><i class="fa-solid fa-minus"></i></button>
                <div class="quantity-add">${product.soLuong}</div>
                <button class="increase-quantity" onclick="handleIncrease(event, ${product.id})"><i class="fa-solid fa-plus"></i></button>   
            </div>
            <div class="price"> ${product.price.toLocaleString('en-US')} đ</div>
            <p class="totalPrice"> ${totalProduct.toLocaleString('en-US')} đ</p>
            <div class="action" onclick="closeItemCart(event, ${product.id})">
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
        </div>`;
    })
    newHTMLCart = newHTMLCart.join("")
    document.getElementById("cart-title").innerHTML = document.getElementById("cart-title").innerHTML + newHTMLCart;
    total();
}

// Tổng tiền 
function total() {
    let totalPriceAll = 0;

    listProductCart.forEach(product => {
        totalPriceAll += product.price * product.soLuong;
    })
    document.getElementById("totalPrice-all").innerHTML = `<div class="bold">Total: ${totalPriceAll} đ</div>`;
}

// giảm số lượng đặt hàng của từng sản phẩm
function handleDecrease(event, id) {
    let quantityCartNew = 0;
    let totalPriceNew = 0;
    let quantityNew = 0;

    let elementQuantityAdd = event.target.closest(".item-cart").querySelector(".quantity-add");

    let elementTotalPrice = event.target.closest(".item-cart").querySelector(".totalPrice");

    let elementQuantityNow = event.target.closest(".item-cart").querySelector(".quantity-now");

    for (let i = 0; i < listProductCart.length; i++) {

        if (listProductCart[i].id.toString() === id.toString()) {
            quantityCartNew = listProductCart[i].soLuong - 1;
            totalPriceNew = quantityCartNew * listProductCart[i].price;
            quantityNew = listProductCart[i].quantity + 1;

            listProductCart[i].soLuong -= 1;
            listProductCart[i].quantity += 1;

            if (quantityNew === 1) {
                event.target.closest(".item-cart").querySelector(".increase-quantity").disabled = false;

            }

            if (quantityCartNew === 1 ) {
                event.target.closest(".item-cart").querySelector(".decrease-quantity").disabled = true  ;
            }

            if (quantityCartNew > 0) {
                console.log(11111, id);
                elementQuantityAdd.innerText = quantityCartNew;
                elementTotalPrice.innerText = totalPriceNew.toLocaleString('en-US') + ` đ`;
                elementQuantityNow.innerText = `Quantity:` + quantityNew;

                const listItemCartCurrent = listItemCart.map((item) => {
                    return {
                        ...item,
                        quantityAdd: item.idSP.toString() === id.toString() ? item.quantityAdd -= 1 : item.quantityAdd
                    }
                });
                const listProductCurrent = listProduct.map((item) => {
                    return {
                        ...item,
                        quantity: item.id.toString() === id.toString() ? item.quantity += 1 : item.quantity
                    }
                });

                setDataStorage(keyLocalStorageItemCart, listItemCartCurrent);
                setDataStorage(keyLocalStorageListSP, listProductCurrent);

                getListProductCart()
                total()
            }
            break;
        }
    }

}

// Tăng số lượng đặt hàng của từng sản phẩm
function handleIncrease(event, id) {
    let quantityCartNew = 0;
    let totalPriceNew = 0;
    let quantityNew = 0;

    let elementQuantityAdd = event.target.closest(".item-cart").querySelector(".quantity-add");

    let elementTotalPrice = event.target.closest(".item-cart").querySelector(".totalPrice");

    let elementQuantityNow = event.target.closest(".item-cart").querySelector(".quantity-now");

    for (let i = 0; i < listProductCart.length; i++) {
        if (listProductCart[i].id.toString() === id.toString()) {
            quantityCartNew = listProductCart[i].soLuong + 1;
            totalPriceNew = quantityCartNew * listProductCart[i].price;
            quantityNew = listProductCart[i].quantity - 1;

            listProductCart[i].soLuong += 1;
            listProductCart[i].quantity -= 1;

            if (quantityNew === 0) {
                event.target.closest(".item-cart").querySelector(".increase-quantity").disabled = true;

            }
            
            if (quantityCartNew === 2 ) {
                event.target.closest(".item-cart").querySelector(".decrease-quantity").disabled = false  ;
            }

            if (quantityNew >= 0) {
                // event.target.closest(".item-cart").querySelector(".increase-quantity").disabled = true;
                elementQuantityAdd.innerText = quantityCartNew;
                elementTotalPrice.innerText = totalPriceNew.toLocaleString('en-US') + ` đ`;
                elementQuantityNow.innerText = `Quantity:` + quantityNew;

                const listItemCartCurrent = listItemCart.map((item) => {
                    return {
                        ...item,
                        quantityAdd: item.idSP.toString() === id.toString() ? item.quantityAdd += 1 : item.quantityAdd
                    }
                });
                const listProductCurrent = listProduct.map((item) => {
                    return {
                        ...item,
                        quantity: item.id.toString() === id.toString() ? item.quantity -= 1 : item.quantity
                    }
                });

                setDataStorage(keyLocalStorageItemCart, listItemCartCurrent);
                setDataStorage(keyLocalStorageListSP, listProductCurrent);


                getListProductCart()
                total()
            }
            break;
        }
    }

}

// Xóa sản phẩm của giỏ hàng
function closeItemCart(event, id) {
    alert('Bạn có chắc chắn muốn xóa:' + id);

    // Tìm cái số lượng (listItemCard) theo id   => Xét lại localStorage listItemCard


    // có id (listItemCard) => id tương ứng (listProduct) + số lượng => xét lại


    const findItem = listItemCart.find((item) => item.idSP === id);

    const listItemCartWithoutId = listItemCart.filter(item => item.idSP !== id);

    setDataStorage(keyLocalStorageItemCart, listItemCartWithoutId);

    const listProductCurrent = listProduct.map((item) => {
        return {
            ...item,
            quantity: item.id?.toString() === id?.toString() ? item.quantity + findItem.quantityAdd : item.quantity
        }
    });

    setDataStorage(keyLocalStorageListSP, listProductCurrent);


    let element = event?.target.closest(".item-cart");
    element.remove();

    total()
}


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
