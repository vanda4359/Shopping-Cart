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

            console.log(data);
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
    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
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

    var formElement = document.querySelector(options.form);

    if (formElement) {

        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });


            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');


                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
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

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // Xử lý TH Blur ra khỏi Input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // Xử lý mỗi khi người dùng nhập vào Input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

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
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
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

