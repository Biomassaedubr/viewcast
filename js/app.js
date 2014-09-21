$('#hiddenCarousel').hide();
$('#view-display').click(function(e){
  $('#hiddenCarousel').show();
});

var d = new Date()
var today = d.getMonth() +"-" + d.getDate() +"-" + d.getFullYear()
var ulocation = {};
strcast = localStorage.getItem(today)
geolocationDisplay.innerHTML = "Failed to get your current location";