//Preloader
$(document).ready(() => {
    //$(document).ready() has no equivalent in vanilla javascript
    document.getElementById("preloader").remove();
    $.ajax({
        type: "GET",
        url:"/api/Users"
    }).done((data) => {
        var client_li = document.getElementById("client_li");
        for (const [key, value] of Object.entries(data)) {
            client_li.innerHTML+=(`    
            <div class="row">
                <h5 style="margin-left:20px">Company name:</h5>
                <span id="name" style="margin-right:20px"><a class="txt-accent-primary" href="/profile?${value.uid}">${value.fullname}</a></span>
            </div>
            </div>`)
        }
    });
})
