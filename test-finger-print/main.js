var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var form = document.querySelector("form");


function showError(input,messenger){
    let parentElement = input.parentElement;
    let small = parentElement.querySelector("small");
    parentElement.classList.add("error");
    small.innerHTML = messenger;
}

function showSuccess(input){
    let parentElement = input.parentElement;
    let small = parentElement.querySelector("small");
    parentElement.classList.remove("error");
    small.innerHTML = "";
}

function checkEmptyError(listItem){
    let isEmptyError = false;
    listItem.forEach(input => {
        input.value = input.value.trim();
        if(input.value === ""){
            isEmptyError = true;
            showError(input,"Vui lòng Nhập Trường Này")
        }
        else {
            showSuccess(input);
        }
    });
    return isEmptyError;
}

function checkEmailError(input){
    const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim();
    let isEmailError = !regexEmail.test(input.value);
    if(regexEmail.test(input.value)){
        showSuccess(input);
    }else{
        showError(input,"Email chưa chính xác")
    }
    return isEmailError;
}

function checkLength(input, min, max){
    input.value = input.value.trim();

    if(input.value.length < min){
        showError(input,`Tối thiểu ${min} ký tự`)
        return true;
    }
    if(input.value.length > max){
        showError(input,`Tối đa ${max} ký tự`)
        return true;
    }
    showSuccess(input);
    return false;
}

function checkMatchPassWord(confirmPassword,password){
    if(confirmPassword.value !== password.value){
        showError(confirmPassword,"Mật Khẩu Không Trùng Khớp");
        return true;
    }
    return false;
}


form.addEventListener("submit", function(e){
    e.preventDefault();

    let isEmptyError = checkEmptyError([username,email,password,confirmPassword]);
    let isEmailError = checkEmailError(email);
    let isUsernameError = checkLength(username, 3, 10);
    let isPassWordError = checkLength(password, 4, 12);
    let isCheckMatch = checkMatchPassWord(confirmPassword, password);
    if(isEmptyError || isEmailError || isUsernameError || isPassWordError || isCheckMatch){
        // không làm việc
    }else{
        //call API
    }
});