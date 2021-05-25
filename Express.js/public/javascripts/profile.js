//Preloader
$(document).ready(() => {
    //$(document).ready() has no equivalent in vanilla javascript
    document.getElementById("preloader").remove();
})
id = window.location.href.split("?")[1];
if (id == undefined)
    id = localStorage.getItem("id");
console.log(id);
$.ajax({
    type: "GET",
    url: "/api/User/" + id,

}).done((data) => {
    console.log(data)
    document.getElementById("profile_photo").src = data.profile_photo;
    document.getElementById("name").innerHTML = data.fullname;
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("company").innerHTML = data.company;
    document.getElementById("website").innerHTML = data.website;
    document.getElementById("linkedin").innerHTML = data.linkedin;
    document.getElementById("instagram").innerHTML = data.instagram;
    document.getElementById("facebook").innerHTML = data.facebook;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("address").innerHTML = data.address;
    for (var [key, value] of Object.entries(data.contacts))
        document.getElementById("contact_li").innerHTML += `
                        <div class="row">
                            <h5>Phone</h5>
                            <span id="phone">${value.name} | ${value.phone}</span>
                        </div>`;
})

