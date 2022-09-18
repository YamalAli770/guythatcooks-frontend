const showPassword = (e) => {
    let passInput = e.currentTarget.previousElementSibling;
    if(passInput.type === 'password') {
        passInput.type = 'text';
    }
    else {
        passInput.type = 'password';
    }
};

export default showPassword;