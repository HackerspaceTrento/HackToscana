var radarData = {};
radarData['michele'] = [ 10, 5, 7, 8, 71 ];
radarData['marco'] = [ 32, 61, 5, 4, 51 ];
radarData['anita'] = [ 40, 45, 37, 64, 5 ];
radarData['anna'] = [ 50, 45, 59, 35, 2 ];

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
            data: radarData['anna']
        }
    ]
};
var radar = document.getElementById("radar");
var ctx = radar.getContext("2d");
var myRadarChart = new Chart(ctx).Radar(data, {});

$(function(){
    $('#radar-container .sc').click(function(e){
        data.datasets[0].data = radarData[$(e.target).text()];
        myRadarChart = new Chart(ctx).Radar(data, {});
    });
})