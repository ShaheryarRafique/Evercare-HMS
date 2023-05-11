let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let Password = document.getElementById('Password');
let CnfrmPassword = document.getElementById('CnfrmPassword');
let address = document.getElementById('address');
let state = document.getElementById('gender');

//Add event Listners
firstName.addEventListener('input', ()=> validateName(firstName));
lastName.addEventListener('input', ()=> validateName(lastName));
Password.addEventListener('input', ()=> validatePassword(Password))
CnfrmPassword.addEventListener('input', ()=> validateCnfrmPass(CnfrmPassword));
state.addEventListener('blur', ()=> validateCountry_State(state));
address.addEventListener('blur', validateAddress);

function validateCountry_State(id) {

    if(id.value == '') {
        id.classList.add('is-invalid');
    }
    else {
        id.classList.remove('is-invalid');
    }
}

function validateAddress() {

    let regex = /^([\w])+(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\s)(?=.*[^a-zA-Z0-9]).{10,100}$/;
    
    if(regex.test(address.value)) {
        address.classList.remove('is-invalid');
        address.classList.add('is-valid');
    }
    else {
        address.classList.add('is-invalid');
    }

}

function validateCnfrmPass(id_2) {

        let pass1 = Password.value;
        let pass2 = CnfrmPassword.value;
        let msg = id_2.parentNode.childNodes[5];
        
        if(!pass2.localeCompare(pass1)) {

            id_2.classList.remove('is-invalid');
            id_2.classList.add('is-valid');
            msg.innerHTML = "Your password matches.";
        }
        else {
            id_2.classList.add('is-invalid');
            msg.innerHTML = "Your password does not match !";
        }

}

function validatePassword(id_2) {

    let str_2 = id_2.value;
    let msg = id_2.parentNode.childNodes[5];
    
    let weak_regax = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*[^0-9a-zA-Z])(?!.*\s).{3,6}$/;
    let medium_regax = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-z])(?!.*[^a-zA-z0-9])(?!.*\s).{7,10}$/;
    let strong_regax = /^^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[^0-9a-zA-z]).{8,15}$$/;

    if(weak_regax.test(str_2)) {
        id_2.classList.add('is-invalid');
        msg.innerHTML = "Your password strength is too weak";
    }
    else if(medium_regax.test(str_2)){
        
        id_2.classList.remove('is-invalid');
        id_2.classList.add('is-valid');
        msg.innerHTML = "Your password strength is medium";
    }
    else if(strong_regax.test(str_2)) {

        id_2.classList.remove('is-invalid');
        id_2.classList.add('is-valid');
        msg.innerHTML = "Your password strength is strong";
    }

    validateCnfrmPass(CnfrmPassword);
}


function validateName(id) {

    let str = id.value;
    let regax = /^[a-zA-z]([a-zA-Z])(?!.*\d)(?!.*[^a-zA-Z0-9]).{1,10}$/;

    if(regax.test(str)) {
        id.classList.add('is-valid');
        id.classList.remove('is-invalid');
    }
    else {
        id.classList.add('is-invalid');
    }
}
