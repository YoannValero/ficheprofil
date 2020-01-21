
var ctx = document.getElementById('can').getContext('2d');

Chart.defaults.global.title,
Chart.defaults.global.tooltips,
Chart.defaults.global.legend.fontFamily = 'Permanent Marker, cursive'

var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
        labels: [],
		datasets: [{
			label: "Niveau d'utilisation des technologies de Développement Web",
			data: [],
			backgroundColor: [
                
                'rgba(29, 112, 162, 0.7)',
				'rgba(108,58,68,0.7)',
				'rgba(244,215,77,0.7)',
				'rgba(37,19,81,0.7)',
				'rgba(222,186,111,0.7)',
				'rgba(130,48,56,0.7)',
				'rgba(209,96,20,0.7)',
				'rgba(141,170,157,0.7)',
				'rgba(228,149,158,0.7)',
				'rgba(228,149,158,0.7)',
                
                
			],
			borderColor: [
                
                '#fff',
				'#fff',
				'#fff',
				'#fff',
				'#fff',
				'#fff',
				'#fff',
				'#fff',
				'#fff'
                
			],
			borderWidth: 0.4
		}
    ]
},
options: {
    legend: {
			display: false,
			position: 'bottom',
			labels: {
                fontColor: "#fff",
				fontSize: 14,
				fontFamily: 'Nunito, sans-serif'
			}
		},
		title: {
            display: true,
			text: "Niveau d'utilisation des technologies de développement Web",
			fontColor: "#fff",
			fontSize: 18,
			fontFamily: 'Nunito, sans-serif'
		},
		scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
					zeroLineColor: 'rgba(0, 0, 0, 1)',
					display: true,
					fontFamily: 'Nunito, sans-serif',
					fontColor: "rgba(255, 255, 255, 0.5))",
					max: 18,
					fontSize: 12
				}
			}],
			xAxes: [{
                ticks: {
					display: true,
					fontFamily: 'Nunito, sans-serif',
					fontColor: "rgba(255, 255, 255, 0.5))",
					max: 100,
					fontSize: 12

				}
			}]

            
		}
	}
});

fetch('http://localhost:1337/ficheprofils').then((resp) => {
    resp.json().then((data) => {
        let compTech = data[0].comptech[0];

        let compTechKeys = Object.keys(compTech) // Contain libelle languageProgramming with 'id'
        let compTechValue = Object.values(compTech)
        console.log(compTechValue);
        
        compTechValue.forEach( (valueTech) => {
            if(valueTech !== 1) { // Sort ID with value = 1
                myChart.data.datasets[0].data.push(valueTech)   
            }  
        });

        let techTransform = compTechKeys.map((e) => { // Change character
            return e.charAt(0).toUpperCase() + e.substr(1).split('_').join(' ').split('8').join('é').replace('7', "'").replace('9', 'è')
        })
        
        for (let i = 0; i < techTransform.length; i++) {
            if (techTransform[i] !== 'Id') { // sort Id in array of nameCompTechnique
                let libelleTech = techTransform[i];
                myChart.data.labels.push(libelleTech)
                myChart.update()
            }
        }

    })
})