/**
 * Created by ahtasham on 29/12/14.
 */
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help profile fill in the information.

function initialize() {

    var options = {
        types: ['(cities)']
    };

    var input = document.getElementById('frmLocation');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}