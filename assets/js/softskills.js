var myConfig = {
    type: 'radar',
    plot: {
        aspect: 'area',
        animation: {
            effect: 3,
            sequence: 1,
            speed: 700
        }
    },
    scaleV: {
        visible: false,

    },
    scaleK: {
        values: '0:7:1',
        labels: [],
        item: {
            fontColor: '#607D8B',
            backgroundColor: "white",
            borderColor: "#aeaeae",
            borderWidth: 1,
            padding: '5 10',
            borderRadius: 10

        },
        refLine: {
            lineColor: '#c10000'
        },
        tick: {
            lineColor: '#59869c',
            lineWidth: 2,
            lineStyle: 'dotted',
            size: 20
        },
        guide: {
            lineColor: "#607D8B",
            lineStyle: 'solid',
            alpha: 0.3,
            backgroundColor: "#c5c5c5 #718eb4"
        }
    },
    series:
        [{
            values: [],
            text: 'farm'
        },
        ]
};

zingchart.render({
    id: 'myChart',
    data: myConfig,
    height: '100%',
    width: '100%'
});


fetch('http://localhost:1337/ficheprofils').then((resp) => {
    resp.json().then((data) => {

        let softsKeys = Object.keys(data[0].softs) // Contain softskeys in Array with 'Id'

        let softsValue = Object.values(data[0].softs) // Contain softs values in Array
  
        // push level soft skills in zingchart
        softsValue.forEach ( (number) => {
            if (number !== 1) {   // sort id value 1 
                // console.log(number);
                myConfig.series[0].values.push(number)
            }
        })
        
        // Change character
        let softTransform = softsKeys.map((e) => { // Change character
            return e.charAt(0).toUpperCase() + e.substr(1).split('_').join(' ').split('8').join('é').replace('7', "'").replace('9', 'è')
        })
        // push name softs skills in zing charts 
        softTransform.forEach((soft) => {
            if (soft !== 'Id') {      // Sort Id
                console.log(soft);    // contain name soft skills 
                myConfig.scaleK.labels.push(soft)
            }
        })
        // maj Zing charts
        zingchart.render({
            id: 'myChart',
            data: myConfig,
            height: '100%',
            width: '100%'
        });
    })
})
