var peopleData = {
    michele: {
        radarData: [ 10, 5, 7, 8, 71 ],
        sliderData: [ 1, 1, 1, 1, 3 ],
        waypoints: [
            L.latLng(43.7780042,11.2449093),
            L.latLng(43.7701208,11.2672878),
        ],
        mezzo: 'auto',
        chart_cfg: {
              dimension:"250",
              text:"3%",
              info:"sconto 5% per autobus",
              width:30,
              fontsize:38,
              percent:3,
              fgcolor:"#61a9dc",
              bgcolor:"#eee",
              fill:"#ddd",
            //   total:200,
            //   part:35,
              icon:"long-arrow-up",
              iconsize:28,
              iconcolor:"#fff"
        }
    },
    marco: {
        radarData: [ 32, 61, 5, 4, 51 ],
        sliderData: [ 1, 3, 1, 1, 2 ],
        waypoints: [
            L.latLng(43.7780042,11.2449093),
            L.latLng(43.7701208,11.2672878),
        ],
        mezzo: 'bicycle',
        chart_cfg: {
              dimension:"250",
              text:"34%",
              info:"noleggio gratuito bici",
              width:30,
              fontsize:38,
              percent:34,
              fgcolor:"#61a9dc",
              bgcolor:"#eee",
              fill:"#ddd",
            //   total:200,
            //   part:35,
              icon:"long-arrow-up",
              iconsize:28,
              iconcolor:"#fff"
        }
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
        mezzo: 'pedestrian',
        chart_cfg: {
              dimension:"250",
              text:"73%",
              info:"ingresso museo al 50%",
              width:30,
              fontsize:38,
              percent:73,
              fgcolor:"#61a9dc",
              bgcolor:"#eee",
              fill:"#ddd",
            //   total:200,
            //   part:35,
              icon:"long-arrow-up",
              iconsize:28,
              iconcolor:"#fff"
        },
        mangiare:true
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
        mezzo: 'pedestrian',
        chart_cfg: {
              dimension:"250",
              text:"98%",
              info:"visita all'orto botanico",
              width:30,
              fontsize:38,
              percent:98,
              fgcolor:"#61a9dc",
              bgcolor:"#eee",
              fill:"#ddd",
            //   total:200,
            //   part:35,
              icon:"long-arrow-up",
              iconsize:28,
              iconcolor:"#fff"
        },
        spesa:true,
        winner:true, path:'anna.png'
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
        var person_name = $(e.target).text();
        var person = peopleData[person_name];

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
        
        if (person.mangiare) {
            $('#food').bootstrapSwitch('state', true);
        } else {
            $('#food').bootstrapSwitch('state', false);
        }
        if (person.spesa) {
            $('#shopping').bootstrapSwitch('state', true);
        } else {
            $('#shopping').bootstrapSwitch('state', false);
        }
        
        showBadge(person_name);
    }).hide();
    
    $(document).keypress(function(event) {
        if (event.which == 49) {
            $('.sc.michele').click();
        } else if (event.which == 50) {
            $('.sc.marco').click();
        } else if (event.which == 51) {
            $('.sc.anita').click();
        } else if (event.which == 52) {
            $('.sc.anna').click();
        }
    });
})