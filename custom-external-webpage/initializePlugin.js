
// initialize the plugin by reading the configs and setting things up as required
function initiatePlugin(config) {
    var customUrlIframe = document.getElementById('custom-url-iframe');
    customUrlIframe.setAttribute("src", config.url); 

    if (config.height) {
      const height = typeof config.height === 'string' ? parseInt(config.height) : config.height;
      // This sets the height of the outer iframe
      courseraApi.callMethod({
        type: 'SET_HEIGHT',
        data: {
          height,
        },
      });
    }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  if (!courseraApi) {
    alert('Coursera API not found');
  }
  courseraApi.callMethod({
      type: "GET_SESSION_CONFIGURATION",
      onSuccess: initiatePlugin,
      onError: console.log,
  });
}); 
 
