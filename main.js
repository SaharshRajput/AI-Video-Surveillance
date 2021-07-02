objects = [];
status = "";

function preload(){
  video = createVideo('video.mp4');
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}
function gotResult(error,results)
{
if (error)
{
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}
function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="Status : Objects Detected";
document.getElementById("number_of_objects").innerHTML="No. of objects detected :"+objects.length;
fill("#FF0000");
percent=floor(objects[0].confidence*100);
text(objects[0].label+" "+percent+" "+"%",objects[0].x+15,objects[0].y+15);
noFill();
stroke("#FF0000");
rect(objects[0].x,objects[0].y,objects[0].width,objects[0].height);
}
    }
}