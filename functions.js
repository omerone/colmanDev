remainingQuota = 10 * 1024 * 1024;
selectedFiles = [];
totalFilesSize = 0;git 

function uploadPicture() {
  if(selectedFiles != null){
    selectedFiles = [];
    totalFilesSize = 0;
  }
  input = document.getElementById("uploadInput");
  input.click();

  input.onchange = function (e) {
    selectedFiles = Array.from(e.target.files);
    allowedFormats = ["jpg", "jpeg", "gif", "png"];

    
    selectedFiles.forEach(file => {
      fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedFormats.indexOf(fileExtension) === -1) {
        alert("File format isn’t supported");
        return;
      }
      if (totalFilesSize > remainingQuota) {
        alert("File is too big!");
        return;
      }
      totalFilesSize += file.size;
    }); 

    console.log(totalFilesSize);

    remainingQuota -= totalFilesSize;

    document.getElementById("calc").addEventListener("click", function () {
      remainingQuotaText = document.getElementById("remainingQuotaText");

      uses = document.getElementById("uses");

      dot_movment = document.getElementsByClassName("gradient-bar");

      dot_movment[0].style.width = (10 - remainingQuota / (1024 * 1024)) * 10 + "%";

      uses.textContent = (10 - remainingQuota / (1024 * 1024)).toFixed(3);

      remainingQuotaText.textContent = (remainingQuota / (1024 * 1024)).toFixed(
        3
      );

      remainingQuotaText.style.fontSize = "27px";

      console.log("Remaining quota: " + remainingQuota / (1024 * 1024) + " MB");
    });
  };
}

