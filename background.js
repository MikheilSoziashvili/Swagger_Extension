chrome.storage.sync.get("selectedHost", ({ selectedHost }) => {
    if (!selectedHost) {
      selectedHost = "default-api.singular.api"; // Fallback value
    }
  
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function (details) {
        let headers = details.requestHeaders;
  
        // Check if Host header already exists
        let hostHeader = headers.find((header) => header.name.toLowerCase() === "host");
  
        if (hostHeader) {
          hostHeader.value = selectedHost;
        } else {
          headers.push({ name: "Host", value: selectedHost });
        }
  
        return { requestHeaders: headers };
      },
      {
        // Match the specific Swagger URL
        urls: [
          "https://internal-shared-alb-1130894093.eu-west-1.elb.amazonaws.com/swagger/index.html"
        ]
      },
      ["blocking", "requestHeaders"]
    );
  });
  