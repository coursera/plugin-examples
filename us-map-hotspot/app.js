var width = 600,
  height = 450,
  centered;

var projection = d3.geo
  .albersUsa()
  .scale(800)
  .translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var svg = d3
  .select("#vis")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg
  .append("rect")
  .attr("class", "background")
  .attr("width", width)
  .attr("height", height)
  .on("click", clicked);

var g = svg.append("g");

d3.json("us.json", function(error, us) {
  if (error) throw error;

  g
    .append("g")
    .attr("id", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("click", clicked);

  g
    .append("path")
    .datum(
      topojson.mesh(us, us.objects.states, function(a, b) {
        return a !== b;
      })
    )
    .attr("id", "state-borders")
    .attr("d", path);

  courseraApi.callMethod({
    type: "SET_HEIGHT",
    data: {
      height: "500px"
    }
  });

  courseraApi.callMethod({
    type: "GET_SESSION_CONFIGURATION",
    onSuccess: function(configuration) {
      const { stateId, stateName, feedback, isCorrect } = configuration;

      if (stateId) {
        g.selectAll("path").classed("active", function(d) {
          return d.id === stateId;
        });
      }

      if (stateName) {
        document.getElementById("title").innerText = `Select ${stateName}`;
      }

      if (feedback) {
        const e = document.getElementById("feedback");
        e.innerText = feedback;
        if (isCorrect) {
          e.classList.add("correct");
        }
      }

      courseraApi.callMethod({
        type: "GET_STORED_VALUES",
        data: ["lastLoadTime"],
        onSuccess: function(values) {
          courseraApi.callMethod({
            type: "SET_STORED_VALUES",
            data: {
              lastLoadTime: Date.now()
            }
          });
        }
      });
    }
  });
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    centered = d;
  } else {
    centered = null;
  }

  // Set highlight colour
  g.selectAll("path").classed(
    "active",
    centered &&
      function(d) {
        return d === centered;
      }
  );

  // Send message
  if (d && centered === d) {
    courseraApi.callMethod({
      type: "SET_ANSWER",
      data: {
        answer: { stateId: d.id }
      }
    });
  } else {
    const answer = {};

    courseraApi.callMethod({
      type: "SET_ANSWER",
      data: {
        answer: {}
      }
    });
  }
}
