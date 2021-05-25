class User {
    //still not sure about what the User object will store
    constructor(uid,fullname,phone,pin,contacts) {
        this.uid = uid;
        this.contacts = contacts;
        this.fullname = fullname;
        this.phone = phone;
        this.pin = pin;
    }
}

module.exports = User;