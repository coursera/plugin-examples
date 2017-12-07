## Coursera Plugins
Plugins on Coursera enable embedding external websites and applications within a Coursera course. The coursera-connect library provides an interface with the Coursera platform and API. Currently, ungraded items, graded quiz questions and quizzes, and in-video quizzes are supported.

### Getting Started
Each Coursera plugin requires an `index.html` file and a `manifest.json` file in the plugin's directory.

#### API Documentation

Documentation for the API can be found [here](https://docs.google.com/document/d/1ZGvj25_P8X3ML2YcMpJ2TB9sfHYwlYoxYZlPj8sPJTs). This includes instructions on how to configure the `manifest.json` file.

#### Using the library
Include references to the `coursera-connect` stylesheet and JavaScript library in your plugin's index.html file.
~~~HTML
<html>
  <head>
    <link rel="stylesheet" href="https://www.coursera.org/widget/coursera-connect.css">
    <script src="https://www.coursera.org/widget/coursera-widget-connect-v0.js"></script>
  </head>
  <body>
    .
    .
  </body>
</html>
~~~

A Coursera plugin establishes connection with the Coursera platform upon loading. Each plugin has a configuration associated with it. This configuration should be used to change the characteristics of the plugin instance.

#### Example
~~~JavaScript
function initiateApp(configuration) {
  // use your configuration values to run your app!
}

courseraApi.callMethod({
  type: "GET_SESSION_CONFIGURATION",
  onSuccess: initiateApp
});
~~~

### Plugin Simulation

To aid development, we host a [simulator](http://courseraplugins.com/plugin-simulator) that lets developers preview and iterate on their plugin before uploading to Coursera. The simulator implements the full Coursera plugin API, with mock behavior to simulate integration with real course and learner data.

#### Example Plugins

Example plugins are provided in this repository. To use the simulator, serve your plugin locally over HTTP ([example HTTP server](https://github.com/indexzero/http-server)) and enter the respective URL in the provided input.
