let modelURL = "https://kollinb.github.io/model/model.json";
let model;

async function loadModel() {
    console.log('Loading model from ' + modelURL);

    model = undefined;
    try {
        model = await tf.loadLayersModel(modelURL);
    } catch(err) {
        console.log('Failed to load model');
        console.log(err);
    }
}

function preprocessImage(image) {
    let tensor = tf.browser.fromPixels(image).resizeNearestNeighbour([37, 37]).toFloat();
    tensor = tf.image.rgb

    return tensor.expandDims();
}

function predictResult() {
    let image = document.getElementById("predict-img");
    let tensor = preprocessImage(image);
    let predictions = await model.predict(tensor).data();

    console.log(predictions);
}



// renders the image which is loaded from disk to the img tag 
function renderImage(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
        img_url = event.target.result;
        document.getElementById("test-image").src = img_url;
    }
    reader.readAsDataURL(file);
}