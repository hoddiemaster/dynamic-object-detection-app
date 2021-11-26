img = "";
objectStatus = "";
objects = [];
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetecter = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status : detecting objects";

}

function draw() {

    r = random(255);
    g = random(255);
    b = random(255);
    image(video, 0, 0, 640, 420);
    if (objectStatus != 0) {
        objectDetecter.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("number_of_objects").innerHTML = "nuber of objects detected : " + objects.length();
            document.getElementById("status").innerHTML = "status : Object Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }

}
function modelloaded() {
    console.log("model Loaded");
    objectStatus = true;
  
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
