const showPassword = (e, setPassVisible) => {
    let passInput = e.currentTarget.previousElementSibling;
    if(passInput.type === 'password') {
        passInput.type = 'text';
        setPassVisible(true);
    }
    else {
        passInput.type = 'password';
        setPassVisible(false);
    }
};

export default showPassword;