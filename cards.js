let drawCD = document.getElementById("drawCd");
let drawnCard = document.getElementById("drawnCard");
let royalRoadButton = document.getElementById("royalRoad");
let drawButton = document.getElementById("draw");
let royalRoadEffectTag = document.getElementById("royalRoadEffect");
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
let drawInterval = 0;
let drawn = 0;

drawButton.addEventListener("click", draw);
royalRoadButton.addEventListener("click", royalRoad);

function spread(){
    if(drawn === 0) return;
    spreadContent = drawn;
    updateSpread();
    drawn = 0;
    updateDrawn();
}

function updateSpread(){
    if(spread === 0){
        spreadTag.innerHTML = "";
    }else{
        spreadTag.innerHTML = cards[spread-1].name;
    }
}

function royalRoad(){
    if(drawn === 0) return;
    royalRoadEffect = cards[drawn-1].royalRoad;
    royalRoadEffectTag.innerHTML = royalRoadText[royalRoadEffect];
    drawn = 0;
    updateDrawn();
}

function draw(){
    if(drawInterval != 0) return;
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