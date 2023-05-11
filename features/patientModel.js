const dateFormat = require('date-format');

class Patient {

    constructor(name, email, password, sickness, gender, DOB, phone, address ,registrationDate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.sickness = sickness;
        this.gender = gender;
        this.DOB = DOB;
        this.phone = phone;
        this.address = address;
        this.registrationDate = registrationDate;
    }
}

module.exports = Patient;