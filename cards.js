var drawButton = document.getElementById("draw");
var drawCD = document.getElementById("drawCd");
var drawnCard = document.getElementById("drawnCard");
var royalRoadButton = document.getElementById("royalRoad");
var royalRoadEffectTag = document.getElementById("royalRoadEffect");
const cards = [
    {
        name:"balance",
        royalRoad:0
    },
    {
        name:"bole",
        royalRoad:0
    },
    {
        name:"spire",
        royalRoad:1
    },
    {
        name:"ewer",
        royalRoad:1
    },
    {
        name:"spear",
        royalRoad:2
    },
    {
        name:"arrow",
        royalRoad:2
    }
]
const royalRoadText = ["Power", "AoE", "Duration"]
var drawInterval = 0;
var drawn = 0;

drawButton.addEventListener("click", draw);
royalRoadButton.addEventListener("click", royalRoad);

function royalRoad(){
    if(drawn == 0) return;
    royalRoadEffect = cards[drawn-1].royalRoad;
    royalRoadEffectTag.innerHTML = royalRoadText[royalRoadEffect];
    drawn = 0;
    updateDrawn();
}

function draw(){
    if(!drawInterval == 0) return;
    drawn = Math.floor(Math.random()*6)+1;
    updateDrawn();
    drawCD.innerHTML = "5";
    drawInterval = setInterval(updateDrawCD, 1000);
    function updateDrawCD(){
        drawCD.innerHTML = Number(drawCD.innerHTML)-1;
        if(Number(drawCD.innerHTML) == 0){
            clearInterval(drawInterval);
            drawInterval = 0;
            drawCD.innerHTML = "";
        }
    }
}

function updateDrawn(){
    if(drawn == 0){
        drawnCard.innerHTML = "";
    }else{
        drawnCard.innerHTML = cards[drawn-1].name;
    }
}