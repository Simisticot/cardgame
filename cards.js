const drawCD = document.getElementById("drawCd");
const drawnCard = document.getElementById("drawnCard");
const royalRoadButton = document.getElementById("royalRoad");
const drawButton = document.getElementById("draw");
const royalRoadEffectTag = document.getElementById("royalRoadEffect");
const spreadContentTag = document.getElementById("spreadContent");
const spreadButton = document.getElementById("spread");
const sleeveDrawCD = document.getElementById("sleeveDrawCD");
const sleeveDrawButton = document.getElementById("sleeveDraw");
const playerTags = document.querySelectorAll(".player");
const cooldownSleeveDraw = 3;
const cooldownDraw = 3;
const players = [
    {
        name:"Aquila",
        job: 0,
        balance: false,
        spear: false,
        arrow: false
    }
]
const jobs = [
    {
        name:"DRG",
        dps: 6000,
        critScaling: 1,
        speedScaling: 1,
        timeoutBalance: 0,
        timeoutSpear: 0,
        timeoutArrow: 0
    }
]
const cards = [
    {
        name:"",
        royalRoad:0
    },
    {
        name:"balance",
        royalRoad:1
    },
    {
        name:"bole",
        royalRoad:1
    },
    {
        name:"spire",
        royalRoad:2
    },
    {
        name:"ewer",
        royalRoad:2
    },
    {
        name:"spear",
        royalRoad:3
    },
    {
        name:"arrow",
        royalRoad:3
    }
]
const royalRoadText = ["", "Power", "AoE", "Duration"]
let drawInterval = 0;
let drawn = 0;
let sleeveDrawInterval = 0;
let spreadContent = 0;
let royalRoadEffect = 0;
let damage_interval = setInterval(updateDamage, 1000);

drawButton.addEventListener("click", draw);
royalRoadButton.addEventListener("click", royalRoad);
spreadButton.addEventListener("click", spread);
sleeveDrawButton.addEventListener("click", sleeveDraw);

for(let i = 0; i < playerTags.length; i++){
    playerTags[i].querySelector(".play").addEventListener("click", function(){buff(drawn, i)});
}

function spread(){
    if(spreadContent === 0){
        if(drawn === 0) return;
        updateSpread(drawn);
        updateDrawn(0);
        startDrawCD();
    }else{
        updateSpread(0);
        updateRoyalRoad(0);
    }
}

function updateSpread(value){
    spreadContent = value;
    spreadContentTag.innerHTML = cards[spreadContent].name;
}

function royalRoad(){
    if(drawn === 0) return;
    updateRoyalRoad(cards[drawn].royalRoad);
    updateDrawn(0);
    startDrawCD();
}

function updateRoyalRoad(value){
    royalRoadEffect = value;
    royalRoadEffectTag.innerHTML = royalRoadText[royalRoadEffect];
}

function draw(){
    if(drawn === 0){
        if(drawInterval !== 0) return;
        updateDrawn(randomCard());
    }else{
        updateDrawn(0);
        updateRoyalRoad(0);
        startDrawCD();
    }
}

function startDrawCD(){
    drawCD.innerHTML = cooldownDraw;
    drawInterval = setInterval(updateDrawCD, 1000);
    function updateDrawCD(){
        drawCD.innerHTML = Number(drawCD.innerHTML)-1;
        if(Number(drawCD.innerHTML) === 0){
            endDrawCD();
        }
    }
}

function updateDrawn(value){
    drawn = value;
    drawnCard.innerHTML = cards[drawn].name;
}

function randomCard(){
    return Math.floor(Math.random()*6)+1;
}

function sleeveDraw(){
    if(drawn === 0){
        updateDrawn(randomCard());
        endDrawCD();
        startSleeveDrawCD();
    }
    if(royalRoadEffect === 0)
    updateRoyalRoad(cards[randomCard()].royalRoad);
    if(spreadContent === 0)
    updateSpread(randomCard());
}

function startSleeveDrawCD(){
    sleeveDrawCD.innerHTML = cooldownSleeveDraw;
    sleeveDrawInterval = setInterval(updateSleeveDrawCD, 1000);
    function updateSleeveDrawCD(){
        sleeveDrawCD.innerHTML = Number(sleeveDrawCD.innerHTML)-1;
        if(Number(sleeveDrawCD.innerHTML) === 0){
            endSleeveDrawCD();
        }
    }
}

function endSleeveDrawCD(){
    clearInterval(sleeveDrawInterval);
    sleeveDrawInterval = 0;
    sleeveDrawCD.innerHTML = "";
}

function endDrawCD(){
    clearInterval(drawInterval);
    drawInterval = 0;
    drawCD.innerHTML = "";
}

function updateDamage(){
    for(let i = 0; i < playerTags.length; i++){
        let dps = Number(playerTags[i].querySelector(".dps").innerHTML);
        let damage = Number(playerTags[i].querySelector(".damage").innerHTML);
        playerTags[i].querySelector(".damage").innerHTML = damage+dps;
    }
}

function buff(card, player){
    switch(card){
        case 1:
            players[player].balance = true;
            players[player].timeoutBalance = setTimeout(endBuff, 10000, 1, player);
            break;
        case 5:
            players[player].spear = true;
            players[player].timeoutSpear = setTimeout(endBuff, 10000, 5, player);
            break;
        case 6:
            players[player].arrow = true;
            players[player].timeoutArrow = setTimeout(endBuff, 10000, 6, player);
            break;
        default:
            return
    }
}

function endBuff(card, player){
    switch(card){
        case 1:
            players[player].balance = false;
            players[player].timeoutBalance = 0;
            break;
        case 5:
            players[player].spear = false;
            players[player].timeoutSpear = 0;
            break;
        case 6:
            players[player].arrow = false;
            players[player].timeoutArrow = 0;
            break;
        default:
            return
    }
}
