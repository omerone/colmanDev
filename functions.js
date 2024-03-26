const remainingQuota = 10 * 1024 * 1024;
selectedFiles = [];
totalFilesSize = 0;
const MB = 1024 * 1024;

function uploadPicture() {
  
  if (selectedFiles != null) {
    selectedFiles = [];
    totalFilesSize = 0;
  }

  input = document.getElementById("uploadInput");
  input.click();

  input.onchange = function (e) {
    const selectedFiles = Array.from(e.target.files);
    allowedFormats = ["jpg", "jpeg", "gif", "png"];

    selectedFiles.forEach((file) => {
      fileExtension = file.name.split(".").pop().toLowerCase();

      if (allowedFormats.indexOf(fileExtension) === -1) {
        alert("File format isn’t supported");
        return;
      }

      if (totalFilesSize + file.size > remainingQuota) {
        alert("File is too big!");
        return;
      }
      totalFilesSize += file.size;
    });

    remainingQuota -= totalFilesSize;

    document.getElementById("calc").addEventListener("click", function () {
      dot_movment = document.getElementsByClassName("gradient-bar");
      dot_movment[0].style.width = (10 - remainingQuota / MB) * 10 + "%";

      uses = document.getElementById("uses");
      uses.textContent = (10 - remainingQuota / MB).toFixed(3);

      remainingQuotaText = document.getElementById("remainingQuotaText");
      remainingQuotaText.textContent = (remainingQuota / MB).toFixed(3);
      remainingQuotaText.style.fontSize = "27px";
    });
  };
}
