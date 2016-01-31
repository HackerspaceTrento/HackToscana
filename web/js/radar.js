var peopleData = {
    michele: {
        radarData: [ 10, 5, 7, 8, 71 ],
        sliderData: [ 1, 1, 1, 1, 3 ],
        waypoints: [
            L.latLng(43.7780042,11.2449093),
            L.latLng(43.7701208,11.2672878),
        ],
        mezzo: 'auto'
    },
    marco: {
        radarData: [ 32, 61, 5, 4, 51 ],
        sliderData: [ 1, 3, 1, 1, 2 ],
        waypoints: [
            L.latLng(43.7780042,11.2449093),
            L.latLng(43.7701208,11.2672878),
        ],
        mezzo: 'bicycle'
    },
    anita: {
        radarData: [ 40, 45, 37, 64, 5 ],
        sliderData: [ 1, 1, 1, 3, 1 ],
        waypoints: [
            L.latLng(43.7780042,11.2449093),
            // L.latLng(43.771376,11.2496351),
            L.latLng(43.7749619,11.2538762),
            // L.latLng(43.768512,11.2551968),
            // L.latLng(43.774317,11.267622),
            L.latLng(43.7733197,11.2549752),
            L.latLng(43.7701925,11.2575415),
            L.latLng(43.7701208,11.2672878),
            // L.latLng(43.770723,11.2661737),
        ],
        mezzo: 'pedestrian'
    },
    anna: {
        radarData: [ 50, 45, 59, 35, 2 ],
        sliderData: [ 3, 1, 3, 1, 1 ],
        waypoints: [
            L.latLng(43.7780042,11.2449093),
            L.latLng(43.7785701,11.2601814),
            // L.latLng(43.771376,11.2496351),
            // L.latLng(43.7749619,11.2538762),
            // L.latLng(43.768512,11.2551968),
            // L.latLng(43.774317,11.267622),
            // L.latLng(43.7701925,11.2575415),
            L.latLng(43.777321,11.2637143),
            // L.latLng(43.7785701,11.2601814),
            L.latLng(43.7701208,11.2672878),
            // L.latLng(43.770723,11.2661737),
        ],
        mezzo: 'pedestrian'
    }
};

var data = {
    labels: ["sostenibilità", "salute", "natura", "bellezza", "tempo" ],
    datasets: [
        {
            label: "radar",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: peopleData['anna'].radarData
        }
    ]
};
var radar = document.getElementById("radar");
var ctx = radar.getContext("2d");
var myRadarChart = new Chart(ctx).Radar(data, {});

$(function(){
    $('#radar-container .sc').click(function(e){
        var person = peopleData[$(e.target).text()];

        data.datasets[0].data = person.radarData;
        myRadarChart = new Chart(ctx).Radar(data, {});

        $('#sustainability').slider('setValue',person.sliderData[0]);
        $('#health').slider('setValue',person.sliderData[1]);
        $('#nature').slider('setValue',person.sliderData[2]);
        $('#beauty').slider('setValue',person.sliderData[3]);
        $('#time').slider('setValue',person.sliderData[4]);
        
        if (person.waypoints) {
            if (route) {
              route.removeFrom(map);
            }
            route = L.Routing.control({
              waypoints: person.waypoints,
              router: L.Routing.mapzen('valhalla-48_NtvI', person.mezzo), 
              formatter: new L.Routing.Mapzen.Formatter(), 
              summaryTemplate:'<div class="start">{name}</div><div class="info {transitmode}">{distance}, {time}</div>',
              routeWhileDragging: true, show: false
            }).addTo(map);
        }
    });
})