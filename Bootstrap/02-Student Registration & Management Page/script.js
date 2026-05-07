const toastTrigger = document.querySelector(".delete-btn");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

// export toaster logic
const exportToastTrigger = document.querySelector("#export-btn");
const exportToastLiveExample = document.getElementById("export-toaster");

if (exportToastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(
    exportToastLiveExample,
  );
  exportToastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}
