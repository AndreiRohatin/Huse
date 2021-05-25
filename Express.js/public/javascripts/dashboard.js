//Preloader
marker_li = [];

$(document).ready(() => {
    //$(document).ready() has no equivalent in vanilla javascript
    document.getElementById("preloader").remove();

    database.ref("locations").on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((childSnapshot) => {
            var dict = {};
            dict[childSnapshot.key] = childSnapshot.val();
            li.push(dict);
        });
        showJson(li);
    })

})

async function showJson(li) {
    if (marker_li) $(".marker").remove();
    for (var it in li) {
        var elm = li[it];
        for (var key in elm)
            try {
                var users_ref = await database.ref("Users/" + key).once("value");
                var user_data = await users_ref.val();
                var coords = [elm[key].lng, elm[key].lat];

                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'marker';
                el.id = key;
                marker_li.push(key);
                // make a marker for each feature and add to the map
                var x=new mapboxgl.Marker(el)
                    .setLngLat(coords)
                    .addTo(map);

                var y=new mapboxgl.Marker(el)
                    .setLngLat(coords)
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(`<h3>${user_data.fullname }</h3><p><a href="javascript:closeEmergency('${key}')">Close emergency</a></p>`))
                    .addTo(map);
            } catch {
                
            }
    }
}

function closeEmergency(id) {
    database.ref("locations/" + id).remove();
    database.ref("Emergency/" + id).remove();
}