import {Component, onMount} from "solid-js";

export const CameraPage: Component = () => {
  let camera: HTMLDivElement;
  let video: HTMLVideoElement;
  let startButton: HTMLButtonElement;
  let canvas: HTMLCanvasElement;
  let streaming = false;
  let photo: HTMLImageElement;
  const width = 320; // We will scale the photo width to this
  let height = 0; // This will be computed based on the input stream
  onMount(()=> {

    navigator.mediaDevices
      .getUserMedia({video: true, audio: false})
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (_ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", String(width));
          video.setAttribute("height", String(height));
          canvas.setAttribute("width", String(width));
          canvas.setAttribute("height", String(height));
          streaming = true;
        }
      },
      false,
    );

    startButton.addEventListener(
      "click",
      (ev) => {
        takePicture();
        ev.preventDefault();
      },
      false,
    );

    clearPhoto();
  })

  // Fill the photo with an indication that none has been
  // captured.

  function clearPhoto() {
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takePicture() {
    const context = canvas.getContext("2d")!;
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearPhoto();
    }
  }

  return (
    <div>
      <div ref={camera!} class="camera">
        <video ref={video!} id="video">Video stream not available.</video>
        <button ref={startButton!} id="start-button">Take photo</button>
      </div>
      <canvas ref={canvas!} id="canvas"> </canvas>
      <div class="output">
        <img ref={photo!} id="photo" alt="The screen capture will appear in this box." />
      </div>

      <h1>Camera</h1>
    </div>
  );
}
