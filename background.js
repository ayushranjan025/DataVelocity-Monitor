let startTime, endTime;
let imageSize ="";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed =0;
let numTests = 2;
let testCompleted = 0;

//getting a random image
let imageApi = "https://source.unsplash.com/random?topic=nature";

//when image loads
image.onload = async function imageload(){
    endTime = new Date().getTime();

    //getting image size
    await fetch(imageApi).then((response)=>{
        imageSize = response.headers.get("content-length");
        calcualteSpeed();
    });
};

function calcualteSpeed(){
    //time in seconds
    let timeDuration = (endTime - startTime) /1000;

    let loadBits = imageSize*8;
    let speedInBits = loadBits / timeDuration;
    let speedInKbs = speedInBits/1024;
    let speedInMbs = speedInKbs/1024;

    totalBitSpeed += speedInBits;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    //if all 5 test completed then avg of these
    if(testCompleted == numTests){
        let avgSpeedInBits = (totalBitSpeed / numTests).toFixed(2);
        let avgSpeedInKbs = (totalKbSpeed / numTests).toFixed(2);
        let avgSpeedInMbs = (totalMbSpeed/ numTests).toFixed(2);

        bitSpeed.innerHTML += `${avgSpeedInBits}`;
        kbSpeed.innerHTML += `${avgSpeedInKbs}`;
        mbSpeed.innerHTML += `${avgSpeedInMbs}`;
        info.innerHTML = "Test Completed";
    }else{
        //next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

//initial function to initilize
const init = async function initialize(){
    info.innerHTML = "Testing..."
    startTime = new Date().getTime();
    image.src = imageApi;
}

window.onload = ()=>{
    for(let i=0; i<numTests; i++){
        init();
    }
}