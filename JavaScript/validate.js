// var keyLocalStorageListSP = "DANHSACHSP";

// var keyLocalStorageItemCart = "DANHSACHITEMCART"

document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
    Validator({
        form: '#form-1',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#surname', 'Vui lòng nhập họ của bạn'),
            Validator.isRequired('#name', 'Vui lòng nhập tên của bạn'),
            Validator.isRequired('#email'),
            Validator.isEmail('#email'),
            Validator.isRequired('#phone'),
            Validator.isPhone('#phone', 'Trường này phải là số điện thoại'),
            Validator.isRequired('#province'),
            Validator.isRequired('#district'),
            Validator.isRequired('#ward'),
            Validator.isVillage('#village'),
        ],
        onSubmit: function (data) {
            let province = document.querySelector(`#province option[value='${data.province}']`).innerText
            let district = document.querySelector(`#district option[value='${data.district}']`).innerText
            let ward = document.querySelector(`#ward option[value='${data.ward}']`).innerText

            let totalPriceAll = 0;

            listProductCart.forEach(product => {
                totalPriceAll += product.price * product.soLuong;
            })

            let payload = {
                "fullname": `${data.surname} ${data.name}`,
                "address": `${data.village}, ${ward}, ${district}, ${province}`,
                "code": generateCode(),
                "dateTime": format(new Date()),
                "message": `${data.message}`,
            }

            payload["listOrder"] = getListProductCart();
            payload["totalPriceAll"] = totalPriceAll;
            // lưu thông tin đơn hàng
            handleCreateOrderInfos(payload);
            // xóa danh sách Item giỏ hàng
            removeDataStorage(keyLocalStorageItemCart)
            // localStorage.removeItem(keyLocalStorageItemCart);
            
        }
    });

});

// Đối tượng `Validator`
function Validator(options) {

    function getParent(element, selector) {
        while (element?.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }
    let selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        let errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

        let errorMessage;

        // Lấy ra các rules của selector
        let rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (let i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    let formElement = document.querySelector(options.form);

    if (formElement) {

        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            let isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });


            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]');


                    let formValues = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value;

                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi Rule và xử lý  ( lắng nghe sự kiện blur, Input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi Input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            let inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // Xử lý TH Blur ra khỏi Input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // Xử lý mỗi khi người dùng nhập vào Input
                inputElement.oninput = function () {
                    let errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

                    errorElement.innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            }
        });
    }

    // Trường hợp submit với hành vi mặc định
    else {
        formElement.submit();
    }

}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng số điện thoại'
        }
    };
}

Validator.isVillage = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

