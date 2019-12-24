var apiKey = "pk.eyJ1IjoiZGFtaWFuc29hbmUiLCJhIjoiY2szczBrOHRvMDIybjNkbGpqdWk1bHU1ayJ9.0tcPin8Qdjf9xqcFQ3whRg";

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.pirates",
  accessToken: apiKey
});

var map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 3
});

lightmap.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    function getColor(magnitude) {
        switch (true) {
            case magnitude > 5:
                return "#8a2be2";
            case magnitude > 4:
                return "#ff1493";
            case magnitude > 3:
                return "#006400";
            case magnitude > 2:
                return "#ffd700";
            case magnitude > 1:
                return "#f8f8ff";
        }
    }
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Location: " + feature.properties.place);

        }
    
    }).addTo(map);


});