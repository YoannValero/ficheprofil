// Compétences techniques --------------------------------------
// -------------------------------------------------------------

var ctx = document.getElementById("canvas").getContext('2d');
  
var myChart = new Chart(ctx,{
type:'bar',
data:{
    labels:['HTML','CSS','Javascript procédural', 'Javascript avancé','PHP', 'SQL', 'React', 'Angular', 'Node'], // nom des colonnes
    datasets:[{
        label:'Web Development', 
        data:[60,50,30,5,20,15,1,1,1], // réglages niveau des skills ! virgule à la fin crochet
    backgroundColor : ["red","blue","yellow","white","green", "purple", "pink", "brown","cyan"], // order couleur data
    bordereWidth:1,
    borderColor:"#fff",
    hoverBorderWidth:3,
    padding:50
    }],
}
});


// Graphique Soft -----------------------------------------------
// -------------------------------------------------------------
var myConfig = {
    type : 'radar',
    plot : {
      aspect : 'area',
      animation: {
        effect:3,
        sequence:1,
        speed:700
      }
    },
    scaleV : {
      visible : false,
    
    },
    scaleK : {
      values : '0:7:1',
      labels : ['Fiable','Organisé','Disponible','Réflexif', 'Créatif', 'LeaderShip', 'Curieux', 'Indépendant' ],
      item : {
        fontColor : '#607D8B',
        backgroundColor : "white",
        borderColor : "#aeaeae",
        borderWidth : 1,
        padding : '5 10',
        borderRadius : 10
        
      },
      refLine : {
        lineColor : '#c10000'
      },
      tick : {
        lineColor : '#59869c',
        lineWidth : 2,
        lineStyle : 'dotted',
        size : 20
      },
      guide : {
        lineColor : "#607D8B",
        lineStyle : 'solid',
        alpha : 0.3,
        backgroundColor : "#c5c5c5 #718eb4"
      }
    },
    series : 
      [{values : [4, 4, 3, 4, 3, 3,2,3],
        text:'farm'
      },
    ]
  };
  
  
  zingchart.render({ 
      id : 'myChart', 
      data : myConfig, 
      height: '100%', 
      width: '100%' 
  });

  
