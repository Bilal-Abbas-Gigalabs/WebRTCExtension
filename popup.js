let changeColor = document.getElementById("changeColor");
console.log("This is the color", changeColor);

changeColor.addEventListener("click", async () => {
  chrome.runtime.sendMessage(
    {data: "I am called from popup js file"},
    function (response) {
      console.log(response);
      navigator.mediaDevices
        .getDisplayMedia({video: true})
        .then(async (displayStream) => {
          [videoTrack] = displayStream.getVideoTracks();
          const audioStream = await navigator.mediaDevices
            .getUserMedia({audio: true})
            .catch((e) => {
              throw e;
            });
          console.log("This is the display stream", audioStream);
          // [audioTrack] = audioStream.getAudioTracks();
          // // displayStream.addTrack(audioTrack); // do stuff
          // // or
          // stream = new MediaStream([videoTrack, audioTrack]); // do stuff
          // console.log("This is the stream 1", stream.getTracks());
        })
        .catch(console.error);
    }
  );
});

// The body of this function will be executed as a content script inside the

// current page

async function recordScreen() {
  let audioTrack, videoTrack, stream;
  return navigator.mediaDevices
    .getDisplayMedia({video: true})
    .then(async (displayStream) => {
      [videoTrack] = displayStream.getVideoTracks();
      const audioStream = await navigator.mediaDevices
        .getUserMedia({audio: true})
        .catch((e) => {
          throw e;
        });
      [audioTrack] = audioStream.getAudioTracks();
      // displayStream.addTrack(audioTrack); // do stuff
      // or
      stream = new MediaStream([videoTrack, audioTrack]); // do stuff
      console.log("This is the stream 1", stream.getTracks());
    })
    .catch(console.error);
}

function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({color}) => {
    document.body.style.backgroundColor = color;
  });
}
