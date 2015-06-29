/*Google Maps initialize function*/
var map= null;

function initialize() {

    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(37.975409, 23.735689),
        zoom: 13,
        mapsapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions)

}

google.maps.event.addDomListener(window, 'load', initialize);

function addressGeocode() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': document.registerform.address.value },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                firstLoc = results[0].geometry.location;
                map.setCenter(firstLoc);
                map.setZoom(15);

                var marker = new google.maps.Marker({
                    position: firstLoc,
                    map: map,
                    title: 'Your Address!'
                });
            }
            else{
                /*add a text below map to indicate something is wrong with given address
                 and cannot be shown on map */
            }
        }
    );
}