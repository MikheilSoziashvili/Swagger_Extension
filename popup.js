document.getElementById("apply-header").addEventListener("click", () => {
    const selectedHost = document.getElementById("host-selector").value;
  
    chrome.storage.sync.set({ selectedHost }, () => {
      console.log(`Host set to: ${selectedHost}`);
      
      window.open(
        "http://internal-shared-alb-1130894093.eu-west-1.elb.amazonaws.com/swagger/index.html",
        "_blank"
      );
    });
  });