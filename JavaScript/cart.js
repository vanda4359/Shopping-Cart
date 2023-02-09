

let keyLocalStorageListSP = "DANHSACHSP";

let keyLocalStorageItemCart = "DANHSACHITEMCART"

let listItemCart = app.getData(keyLocalStorageItemCart) || [];
let listProduct = app.getData(keyLocalStorageListSP) ;

testCart();

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

function removeListCart(){
    document.getElementById('cart').style.display = "none";
    document.getElementById('cart-empty').style.display = "block";
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
    let newHTMLCart = 
        `<tr class="item-cart bold">
            <th class="col-sm-4 product-name bold">
                Product Name
            </th>
            <th class="col-sm-3 quantity bold">
                Quantity
            </th>
            <th class="col-sm-2 price bold">Subtotal</th>
            <th class="col-sm-2 totalPrice bold">Total</th>
            <th class="col-sm-1 action bold">
                Clear Cart
            </th>
        </tr>` + 
        listProductCart.map(function (product) {
            let totalProduct = product.price * product.soLuong;
            return `<tr class="item-cart">
                        <td class="col-sm-4 product-name">
                            <div class="image">
                                <img src="${product.image}" >
                            </div>
                            <div class="name-title">
                                <p class="name bold" >${product.name}</p>
                                <div class="quantity-now">Quantity: ${product.quantity}</div>
                            </div>
                        </td>
                        <td class="col-sm-3 quantity">
                            ${product.soLuong > 1
                            ? `<button class="decrease-quantity" onclick="handleDecrease(event, ${product.id})" ><i class="fa-solid fa-minus"></i></button>`
                            : `<button class="decrease-quantity" disabled ><i class="fa-solid fa-minus"></i></button>`
                        }
                            <div class="quantity-add">${product.soLuong}</div>
                            ${product.quantity > 0
                            ? `<button class="increase-quantity" onclick="handleIncrease(event, ${product.id})"><i class="fa-solid fa-plus"></i></button>`
                            : `<button class="increase-quantity" disabled><i class="fa-solid fa-plus"></i></button>`
                        }
                            
                        </td>
                        <td class="col-sm-2 price"> ${product.price.toLocaleString('en-US')} đ</td>
                        <td class="col-sm-2 totalPrice"> ${totalProduct.toLocaleString('en-US')} đ</td>
                        <td class="col-sm-1 action" onclick="deleteItemCart(event, ${product.id})">
                            <i class="fa-regular fa-circle-xmark"></i>
                        </td>
                    </tr>`;
        })?.join("")
        document.getElementById("cart-title").innerHTML = newHTMLCart;
    total();
}

// Tổng tiền 
function total() {
    let totalPriceAll = 0;

    listProductCart.forEach(product => {
        totalPriceAll += product.price * product.soLuong;
    })
    document.getElementById("totalPrice-all").innerHTML = `<div class="bold">Total: ${totalPriceAll.toLocaleString('en-US')} đ</div>`;
}

// giảm số lượng đặt hàng của từng sản phẩm
function handleDecrease(event, id) {

    let elementQuantityAdd = event.target.closest(".item-cart").querySelector(".quantity-add");

    let elementTotalPrice = event.target.closest(".item-cart").querySelector(".totalPrice");

    let elementQuantityNow = event.target.closest(".item-cart").querySelector(".quantity-now");

    for (let i = 0; i < listProductCart.length; i++) {

        if (listProductCart[i].id.toString() === id.toString()) {
            const quantityCart = listProductCart[i].soLuong - 1;
            const totalPrice = quantityCart * listProductCart[i].price;
            const quantity = listProductCart[i].quantity + 1;

            listProductCart[i].soLuong -= 1;
            listProductCart[i].quantity += 1;

            if (quantityCart > 0) {
                elementQuantityAdd.innerText = quantityCart;
                elementTotalPrice.innerText = totalPrice.toLocaleString('en-US') + ` đ`;
                elementQuantityNow.innerText = `Quantity:` + quantity;

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
                app.saveData(keyLocalStorageItemCart, listItemCartCurrent);
                app.saveData(keyLocalStorageListSP, listProductCurrent);
                getListProductCart()
                total()
            }

            if (quantityCart === 1 || quantity === 1) {
                initUI();
            }
        
            break;
        }
    }

}

// Tăng số lượng đặt hàng của từng sản phẩm
function handleIncrease(event, id) {

    let elementQuantityAdd = event.target.closest(".item-cart").querySelector(".quantity-add");

    let elementTotalPrice = event.target.closest(".item-cart").querySelector(".totalPrice");

    let elementQuantityNow = event.target.closest(".item-cart").querySelector(".quantity-now");

    for (let i = 0; i < listProductCart.length; i++) {
        if (listProductCart[i].id.toString() === id.toString()) {
            const quantityCart = listProductCart[i].soLuong + 1;
            const totalPrice = quantityCart * listProductCart[i].price;
            const quantity = listProductCart[i].quantity - 1;

            listProductCart[i].soLuong += 1;
            listProductCart[i].quantity -= 1;

            if (quantity >= 0) {
                elementQuantityAdd.innerText = quantityCart;
                elementTotalPrice.innerText = totalPrice.toLocaleString('en-US') + ` đ`;
                elementQuantityNow.innerText = `Quantity:` + quantity;

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

                app.saveData(keyLocalStorageItemCart, listItemCartCurrent);
                app.saveData(keyLocalStorageListSP, listProductCurrent);
                getListProductCart()
                total()
            }

            if (quantity === 0 || quantityCart === 2) {
                initUI()
            }
            break;
        }
    }

}

// Xóa sản phẩm của giỏ hàng
function deleteItemCart(event, id) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa:' + id);

    if(confirmDelete == true ) {
        console.log(11111);
        const findItem = listItemCart.find((item) => item.idSP === id);
    
        const listItemCartWithoutId = listItemCart.filter(item => item.idSP !== id);
    
        app.saveData(keyLocalStorageItemCart, listItemCartWithoutId);
    
        const listProductCurrent = listProduct.map((item) => {
            return {
                ...item,
                quantity: item.id?.toString() === id?.toString() ? item.quantity + findItem.quantityAdd : item.quantity
            }
        });
    
        app.saveData(keyLocalStorageListSP, listProductCurrent);
    
    
        let element = event?.target.closest(".item-cart");
        element.remove();
    
        total()
    }

}

function closeModalDelete() {
    document.getElementById('modal-delete').style.display = 'none';
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
