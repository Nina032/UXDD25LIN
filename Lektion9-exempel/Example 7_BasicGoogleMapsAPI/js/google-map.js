function init() {
let mapOptions = {
    center: new google.maps.LatLng(40.782710,-73.965310),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 13
};
let venueMap;
venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);

}

function loadScript() {
    let script = document.createElement('script');      //Skapar <script> element
    script.src ='http://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
    document.body.appendChild(script);                  //lägger till script element som sista i body
}

window.onload = loadScript;     //on load anrop till loadScript

//http://maps.googleapis.com/maps/api/js?sensor=false&callback=init

//https://developers.google.com/maps/documentation/javascript/add-google-map
//https://mapsplatform.google.com/maps-demo-key/