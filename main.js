leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
leftWristScore = 0;
HarryPotterstatus = "";
function preload()
{
    HarryPotter = loadSound("Harrypotter.mp3");
    PeterPan = loadSound("Peterpan.mp3");
}

function setup()
{
    Canvas = createCanvas(550,500);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    Posenet = ml5.poseNet(Video, ModelL);
    Posenet.on('pose', Poses);
}
function ModelL()
{
    console.log("Posenet is Initiallized");
}
function Poses(result)
{
    if (result > 0)
    {
        console.log(result);
        leftX = result[0].pose.leftWrist.x;
        leftY = result[0].pose.leftWrist.y;
        rightX = result[0].pose.rightWrist.x;
        rightY = result[0].pose.rightWrist.y;
        leftWristScore = result[0].pose.keypoints[9].score;
    }
}
function draw()
{
    image(Video,0,0,550,550);
    fill(red);
    stroke(red);
    HarryPotterstatus = HarryPotter.isPlaying();
    if (leftWristScore > 0.2)
    {
        circle(leftX, leftY);
        PeterPan.stop();
        if (!HarryPotter)
        {
        HarryPotter.play();
        document.getElementById("song").innerHTML = "Harry Potter"
        }
    }

    
}