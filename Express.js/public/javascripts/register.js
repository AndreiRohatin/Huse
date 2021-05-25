window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn_login").addEventListener("click", () => {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        frAuth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            return user.getIdToken().then((idToken) => {
                return $.ajax({
                    type: "POST",
                    url: "/api/loginUser",
                    dataType: "json",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                    },
                    data: JSON.stringify({ idToken }),
                });
            }).then(() => { return firebase.auth().signOut(); }).then(() => {
                window.location.assign("/main");
            });
            return false;
        });
    });

});