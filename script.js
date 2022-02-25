let video=document.querySelector('video');
let recordbtncont=document.querySelector(".record-btn-cont");
let recordbtn=document.querySelector(".record-btn");
let capturebtncont=document.querySelector(".capture-btn-cont");
let capturebtn=document.querySelector(".capture-btn");

let recordflag=false;
let chunks=[];  //media data in chunks \

let transparentcolor;

let recorder;
let constraints={
    video:true,
    audio:true
}
// navigator - global object - info about browser
// mediadevices- interface hai to connett with hardware
// getusermedia-access for microphone and camera
navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    // storing stream in my html elemnt video
    video.srcObject=stream;
    recorder=new MediaRecorder(stream);
    recorder.addEventListener("start",(e)=>{
        chunks=[];
    })
    recorder.addEventListener('dataavailable',(e)=>{
        chunks.push(e.data);
    })
    recorder.addEventListener("stop",(e)=>{
        // conversion of media chunks data to video

        let blob = new Blob(chunks,{type:"video/mp4"});

        let videourl=URL.createObjectURL(blob);
        let a =document.createElement("a");

        a.href=videourl;
        a.download="stream.mp4";
        a.click();


    })
})
recordbtncont.addEventListener('click',(e)=>{
    if(!recorder) return;

    recordflag=!recordflag;
    if(recordflag){
        // start 
        recorder.start();
        // animation
        recordbtn.classList.add("scale-record");
        starttimer();


    }else{
        // stop
        recorder.stop();
        recordbtn.classList.remove("scale-record");
        stoptimer();


    }
})
capturebtncont.addEventListener("click",(e)=>{
    // using canvas api- drawing graphics add 

    let canvas=document.createElement('canvas');
    canvas.width=video.videoWidth;
    canvas.height=video.videoHeight;

    let tool=canvas.getContext("2d");
    tool.drawImage(video,0,0,canvas.width,canvas.height);
// filter image 
    tool.fillStyle=transparentcolor;
    tool.fillRect(0,0,canvas.width,canvas.height);

    // image url

    let imageurl=canvas.toDataURL();
    // download image
    let a=document.createElement("a");
    a.href=imageurl;
    a.download="image.jpg";
    a.click();

})


let timerID;
let counter=0;
let timer=document.querySelector(".timer");
function starttimer(){
    timer.style.display="block";
    function displaytimer(){
        let totalseconds=counter;
        let hours=Number.parseInt(counter/3600);
        totalseconds=totalseconds%3600;  //remaining value

        let minutes=Number.parseInt(totalseconds/60);


        totalseconds=totalseconds%60;
        let seconds=totalseconds;
        hours=(hours<10)?`0${hours}`:hours;
        minutes=(minutes<10)?`0${minutes}` : minutes;
        seconds=(seconds<10)?`0${seconds}` : seconds
         
        timer.innerText=`${hours}:${minutes}:${seconds}`;

        counter++;

    }
   timerID= setInterval(displaytimer,1000);

    


}
function stoptimer(){
    timer.style.display="none";

    clearInterval(timerID);
    timer.innerText="00:00:00";

}
// filtering logic
let filterlayer=document.querySelector(".filter-layer")

let allfilters=document.querySelectorAll(".filter");
    allfilters.forEach((filterele)=>{
        filterele.addEventListener('click',(e)=>{
            // get background color 

      transparentcolor= getComputedStyle(filterele).getPropertyValue("background-color");
      filterlayer.style.backgroundColor=transparentcolor;

        })
        
    })





