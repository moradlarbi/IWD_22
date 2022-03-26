const video = document.getElementById("video");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceExpressionNet.loadFromUri("./models"),
  faceapi.nets.ageGenderNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    const resizeDetections = faceapi.resizeResults(detections, displaySize);
    if (detections.length === 1) {
      //faceapi.draw.drawDetections(canvas, resizeDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizeDetections);
      resizeDetections.forEach((result) => {
        const { age, gender, genderProbability } = result;
        new faceapi.draw.DrawTextField(
          [
            `${Math.round(age)} years`,
            `${gender} `,
            `${genderProbability.toFixed(2)}`,
          ],
          result.detection.box.bottomRight
        ).draw(canvas);
      });
    } else {
      resizeDetections.forEach((result) => {
        new faceapi.draw.DrawTextField(
          ["there is more than 2 faces"],
          result.detection.box.bottomRight
        ).draw(canvas);
      });
    }
  }, 100);
});
