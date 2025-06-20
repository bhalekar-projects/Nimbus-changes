document.addEventListener("DOMContentLoaded", function () {
  const uploadInput = document.getElementById("resumeUpload");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  if (uploadInput && fileNameDisplay) {
    uploadInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        fileNameDisplay.textContent = file.name;
      } else {
        fileNameDisplay.textContent = "";
      }
    });
  }
});

  AOS.init({
    duration: 1000, // animation duration
    once: true,     // animation only once
  });


  new WOW().init();