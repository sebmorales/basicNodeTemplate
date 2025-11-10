let ios = false;
let started = false;

function askPermission() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    document.body.addEventListener("click", function () {
      DeviceMotionEvent.requestPermission()
        .then(function () {
          console.log("DeviceMotionEvent enabled");
          ios = true;
          started=true;
        })
        .catch(function (error) {
          console.warn("DeviceMotionEvent not enabled", error);
        });
    });
  }
}
