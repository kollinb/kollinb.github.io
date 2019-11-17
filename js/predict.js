let modelURL = "https://kollinb.github.io/model/model.json";
let model;

async function loadModel() {
    console.log('Loading model from ' + modelURL)

    model = undefined;
    try {
        model = await tf.loadLayersModel(modelURL)
    } catch(err) {
        console.log('Failed to load model')
        console.log(err)
    }
}

async function handleFiles(files) {
    previewImage(files[0])
    let predictionResult = await predictImage(files[0]) // should probably wait for them to press a button in prod
}

async function predictImage(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async function () {
        let img = document.createElement('img')
        img.src = reader.result
        let tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([37, 37]).toFloat().expandDims(0)
        tensor.print()

        let predictions = await model.predict(tensor).data()
        console.log(predictions)
    }
}

function previewImage(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
        let img = document.createElement('img')
        img.src = reader.result
        img.style.height = '200px'
        img.style.width = '200px'
        document.getElementById('drag-upload').appendChild(img)
    }
}

$(document).ready(loadModel);