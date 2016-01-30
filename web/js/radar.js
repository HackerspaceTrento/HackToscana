var peopleData = {
    michele: {
        radarData: [ 10, 5, 7, 8, 71 ],
        sliderData: [ 1, 1, 1, 1, 3 ]
    },
    marco: {
        radarData: [ 32, 61, 5, 4, 51 ],
        sliderData: [ 1, 3, 1, 1, 2 ]
    },
    anita: {
        radarData: [ 40, 45, 37, 64, 5 ],
        sliderData: [ 1, 1, 1, 3, 1 ]
    },
    anna: {
        radarData: [ 50, 45, 59, 35, 2 ],
        sliderData: [ 3, 1, 3, 1, 1 ]
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
    });
})