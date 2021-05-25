const admin = require('firebase-admin');
const User = require('../model/user');
const database = admin.database();

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await database.ref("Users").push().set(data);
        res.status(200).send('User saved');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserList = async (req, res, next) => {
    try {
        const users_ref = await database.ref("Users").once("value");
        const user_data = await users_ref.val();
        var user_list = [];
        if (!user_data)
            res.status(404).send("No user found");
        else {
            for (const key of Object.keys(user_data)) {
                var data = user_data[key];
                const _user = new User(key, data.fullname,data.phone,data.pin,data.contacts);
                user_list.push(_user);
            };
            res.status(200).send(user_list);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user_ref = await database.ref("Users/" + id).once("value");
        const user_data = await user_ref.val();
        if (user_data) {
            res.status(200).send(user_data);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user_ref = await database.ref("Users");
        const dict = {};
        dict[id] = data;
        await user_ref.update(dict);
    } catch {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await database.ref("Users/" + id).remove();
        res.send("User deleted");
    } catch {
        res.status(400).send(error.message);
    }
}

const loginUser = async (req, res, next) => {
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin.auth().createSessionCookie(idToken, { expiresIn }).then((sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
        },
            (error) => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
        }
    );
}

const logoutUser = async (req, res, next) => {
    res.clearCookie("session");
    res.redirect("/login");
}
module.exports = {addUser,getUserList,getUser,updateUser,deleteUser,loginUser,logoutUser}