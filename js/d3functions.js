
/* Create force network graph */

			var width2 = 350,
			    height2 = 350;

			var color = d3.scale.category10();

			var force2 = d3.layout.force()
			    .charge(-500)
			    .linkDistance(50)
			    .size([width2, height2]);
			// setInterval(function(){force.alpha(0.25);},250); // Can make the force layout move

			var svg1 = d3.select(".network1")
			    .attr("width", width2)
			    .attr("height", height2);

			d3.json("data/statNetData.json", function(error, graph) {
			  if (error) throw error;

			  force2
			      .nodes(graph.nodes)
			      .links(graph.links)
			      .start();

			  var link2 = svg1.selectAll(".link")
			      .data(graph.links)
			    .enter().append("line")
			      .attr("class", "link")
			      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

			  var node2 = svg1.selectAll(".node")
			      .data(graph.nodes)
			    .enter().append("circle")
			      .attr("class", "node")
			      .attr("r", 5)
			      .style("fill", function(d) { return color(d.group); })
			      .call(force2.drag);

			  node2.append("title")
			      .text(function(d) { return d.name; });

			  force2.on("tick", function() {
			    link2.attr("x1", function(d) { return d.source.x; })
			        .attr("y1", function(d) { return d.source.y; })
			        .attr("x2", function(d) { return d.target.x; })
			        .attr("y2", function(d) { return d.target.y; });

			    node2.attr("cx", function(d) { return d.x; })
			        .attr("cy", function(d) { return d.y; });
          node2.attr("r",9);
			  });
			});


/* Create random network */


var width3 = 500, height3 = 500, colors = d3.scale.category10();

var n = 20, // number of nodes
    m = 35, // number of links
    charge = -500;

var svg3 = d3.select(".network3")
    .attr("width", width3)
    .attr("height", height3)
    .on("mousedown", create3);

create3();

function create3 () {
  svg3.selectAll(".link, .node").remove();
  randomGraph(n, m, charge);
}

function randomGraph (n, m, charge) { //creates a random graph on n nodes and m links
  var nodes3 = d3.range(n).map(Object),
      list3  = randomChoose(unorderedPairs(d3.range(n)), m),
      links3 = list3.map(function (a) { return {source: a[0], target: a[1]} });

  var force3 = d3.layout.force()
      .size([width3, height3])
      .nodes(nodes3)
      .links(links3)
      .charge(charge)
      .on("tick", tick)
      .start();

  var svgLinks3 = svg3.selectAll(".link").data(links3)
    .enter().append("line")
      .attr("class", "link");

  var svgNodes3 = svg3.selectAll(".node").data(nodes3)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 3)
      .style("fill", "white");

  svgNodes3.transition().duration(800)
      .attr("r", function (d) { return 9 }) /*Previous: 3 + 3 * d.weight */
      .style("fill", function (d) { return colors(Math.floor(Math.random() * 4) + 1 ) });

  svgLinks3.transition().duration(800)
      .style("stroke-width", 3);

  function tick () {
    svgNodes3
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y });

    svgLinks3
        .attr("x1", function(d) { return d.source.x })
        .attr("y1", function(d) { return d.source.y })
        .attr("x2", function(d) { return d.target.x })
        .attr("y2", function(d) { return d.target.y });
  }
}

function randomChoose (s, k) { // returns a random k element subset of s
  var a = [], i = -1, j;
  while (++i < k) {
    j = Math.floor(Math.random() * s.length);
    a.push(s.splice(j, 1)[0]);
  };
  return a;
}

function unorderedPairs (s) { // returns the list of all unordered pairs from s
  var i = -1, a = [], j;
  while (++i < s.length) {
    j = i;
    while (++j < s.length) a.push([s[i],s[j]])
  };
  return a;
}



/* Create force network graph - For Ergm */

      var width4 = 500,
          height4 = 500;

      var color = d3.scale.category10();

      var force4 = d3.layout.force()
          .charge(-500)           //.linkDistance(50)
          .size([width4, height4]);
      // setInterval(function(){force.alpha(0.25);},250); // Can make the force layout move

      var svg4 = d3.select(".network4")
          .attr("width", width4)
          .attr("height", height4);

      d3.json("data/toyErgmData.json", function(error, graph4) {
        if (error) throw error;

        force4
            .nodes(graph4.nodes)
            .links(graph4.links)
            .start();

        var link4 = svg4.selectAll(".link")
            .data(graph4.links)
          .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node4 = svg4.selectAll(".node")
            .data(graph4.nodes)
          .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })
            .call(force4.drag);

        node4.append("title")
            .text(function(d) { return d.name; });

        force4.on("tick", function() {
          link4.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node4.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          node4.attr("r",9);
        });
      });

/* Degree Graph*/

      var width6 = 300,
          height6 = 300;

      var color = d3.scale.category10();

      var force6 = d3.layout.force()
          .charge(-200)           //.linkDistance(50)
          .size([width6, height6]);
      // setInterval(function(){force.alpha(0.25);},250); // Can make the force layout move

      var svg6 = d3.select(".network6")
          .attr("width", width6)
          .attr("height", height6);

      d3.json("data/toyErgmData3.json", function(error, graph6) {
        if (error) throw error;

        force6
            .nodes(graph6.nodes)
            .links(graph6.links)
            .start();

        var link6 = svg6.selectAll(".link")
            .data(graph6.links)
          .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node6 = svg6.selectAll(".node")
            .data(graph6.nodes)
          .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })
            .call(force6.drag);

        node6.append("title")
            .text(function(d) { return d.name; });

        force6.on("tick", function() {
          link6.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node6.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          node6.attr("r",9);
        });
      });


// Homophily graph

      var width7 = 300,
          height7 = 300;

      var color = d3.scale.category10();

      var force7 = d3.layout.force()
          .charge(-200)           //.linkDistance(50)
          .size([width7, height7]);
      // setInterval(function(){force.alpha(0.25);},250); // Can make the force layout move

      var svg7 = d3.select(".network7")
          .attr("width", width7)
          .attr("height", height7);

      d3.json("data/toyErgmData4.json", function(error, graph7) {
        if (error) throw error;

        force7
            .nodes(graph7.nodes)
            .links(graph7.links)
            .start();

        var link7 = svg7.selectAll(".link")
            .data(graph7.links)
          .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node7 = svg7.selectAll(".node")
            .data(graph7.nodes)
          .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })
            .call(force7.drag);

        node7.append("title")
            .text(function(d) { return d.name; });

        force7.on("tick", function() {
          link7.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node7.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          node7.attr("r",9);
        });
      });

// Animate graph

    var graph;
    function myGraph() {

        // Add and remove elements on the graph object
        this.addNode = function (id,group) {
            nodes.push({"id": id,"group":group});
            update();
        };

        this.removeNode = function (id) {
            var i = 0;
            var n = findNode(id);
            while (i < links.length) {
                if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                    links.splice(i, 1);
                }
                else i++;
            }
            nodes.splice(findNodeIndex(id), 1);
            update();
        };

        this.removeLink = function (source, target) {
            for (var i = 0; i < links.length; i++) {
                if (links[i].source.id == source && links[i].target.id == target) {
                    links.splice(i, 1);
                    break;
                }
            }
            update();
        };

        this.removeallLinks = function () {
            links.splice(0, links.length);
            update();
        };

        this.removeAllNodes = function () {
            nodes.splice(0, links.length);
            update();
        };

        this.addLink = function (source, target, value) {
            links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        var findNode = function (id) {
            for (var i in nodes) {
                if (nodes[i]["id"] === id) return nodes[i];
            }
            ;
        };

        var findNodeIndex = function (id) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == id) {
                    return i;
                }
            }
            ;
        };

        // set up the D3 visualisation in the specified element
        var w = 300,
                h = 300;

        var color = d3.scale.category10();

        var vis = d3.select(".network5")
          .attr("width", w)
          .attr("height", h);
        //  .on('mousedown',addNodes);


        var force = d3.layout.force();

        var nodes = force.nodes(),
                links = force.links();

        var update = function () {
            var link = vis.selectAll("line")
                    .data(links, function (d) {
                        return d.source.id + "-" + d.target.id;
                    });

            link.enter().append("line")
                    .attr("id", function (d) {
                        return d.source.id + "-" + d.target.id;
                    })
                    .attr("stroke-width", function (d) {
                        return d.value / 10;
                    })
                    .attr("class", "link");
            link.append("title")
                    .text(function (d) {
                        return d.value;
                    });
            link.exit().remove();

            var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id;
                    });

            var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .call(force.drag);

            nodeEnter.append("svg:circle")
                    .attr("r", 9)
                    .attr("id", function (d) {
                        return "Node;" + d.id;
                    })
                    .attr("class", "nodeStrokeClass")
                    .attr("fill", function(d) { return color(d.group); })

            nodeEnter.append("svg:text")
                    .attr("class", "textClass")
                    .attr("x", 14)
                    .attr("y", ".31em");

            node.exit().remove();

            force.on("tick", function () {

                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                link.attr("x1", function (d) {
                    return d.source.x;
                })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });
            });

            // Restart the force layout.
            force
                    .gravity(.08)
                    .charge(-200)
                    .linkDistance(50)
                    .size([w, h])
                    .start();
        };


        // Make it all go
        update();
    }

    function drawGraph() {

        graph = new myGraph("#svgdiv");


        graph.addNode('Sophia',1);
        graph.addNode('Daniel',1);
        graph.addNode('Ryan',2);
        graph.addNode('Lila',2);
        graph.addNode('Suzie',3);
        graph.addNode('Riley',3);
        graph.addNode('Grace',4);
        graph.addNode('Dylan',4);
        graph.addNode('Mason',4);
        graph.addNode('Emma',1);
        graph.addLink('Mason', 'Ryan', '20');
        graph.addLink('Sophia', 'Ryan', '20');
        graph.addLink('Daniel', 'Grace', '20');
        graph.addLink('Suzie', 'Lila', '20');

        keepNodesOnTop();}

    function changeGraph() {
        // callback for the changes in the network
        var step = -1;
        function nextval()
        {
            step++;
            return 2000 + (1500*step); // initial time, wait time
        }

        var tupleTest = ['Emma', 'Sophia'];

        setTimeout(function() {
            graph.addLink(tupleTest[0], tupleTest[1], '20');
            graph.removeLink('Suzie', 'Lila');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
            graph.addLink('Sophia', 'Daniel', '20');
            graph.removeLink('Mason', 'Ryan');
            graph.addLink('Lila','Riley','20');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
            graph.addLink('Daniel', 'Emma', '20');
            graph.removeLink('Sophia', 'Daniel');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
            graph.addLink('Suzie', 'Daniel', '20');

            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
            graph.addLink('Mason', 'Ryan','20');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
            graph.removeLink('Daniel', 'Emma');
            graph.addLink('Dylan', 'Emma', '20');
            graph.removeLink('Lila','Riley');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {       
            graph.removeLink('Dylan', 'Mason');
            graph.removeLink('Suzie', 'Daniel', '20');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
            graph.addLink('Suzie', 'Lila', '20');
            graph.removeLink('Emma', 'Sophia');
            graph.removeLink('Dylan', 'Emma');
            keepNodesOnTop();
        }, nextval());

        setTimeout(function() {
           addNodes()
        }, nextval());
    }

    drawGraph();
    changeGraph();
    //setTimeout(function() {addNodes(),2000+9*1500});

    // because of the way the network is created, nodes are created first, and links second,
    // so the lines were on top of the nodes, this just reorders the DOM to put the svg:g on top
    function keepNodesOnTop() {
        $(".nodeStrokeClass").each(function( index ) {
            var gnode = this.parentNode;
            gnode.parentNode.appendChild(gnode);
        });
    }
    function addNodes() {
        d3.select("#svgdiv")
                .remove();
         changeGraph();
    }



/// MACRO GRAPH 


      var width8 = 500,
          height8 = 500;

      var color = d3.scale.category10();

      var force8 = d3.layout.force()
          .charge(-500)           //.linkDistance(50)
          .size([width8, height8]);
      // setInterval(function(){force.alpha(0.25);},250); // Can make the force layout move

      var svg8 = d3.select(".network8")
          .attr("width", width8)
          .attr("height", height8);

      d3.json("data/toyErgmData8.json", function(error, graph8) {
        if (error) throw error;

        force8
            .nodes(graph8.nodes)
            .links(graph8.links)
            .start();

        var link8 = svg8.selectAll(".link")
            .data(graph8.links)
          .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node8 = svg8.selectAll(".node")
            .data(graph8.nodes)
          .enter().append("circle")
            .attr("class", "node")
            .style("fill", function(d) { return color(d.group); })
            .call(force8.drag);

        node8.append("title")
            .text(function(d) { return d.name; });

        force8.on("tick", function() {
          link8.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node8.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          node8.attr("r", function(d) { return d.nodeSize; });
        });
      });

/// EGO GRAPH 

      var width9 = 500,
          height9 = 500;

      var color = d3.scale.category10();

      var force9 = d3.layout.force()
          .charge(-300)           //.linkDistance(50)
          .size([width9, height9]);
      // setInterval(function(){force.alpha(0.25);},250); // Can make the force layout move

      var svg9 = d3.select(".network9")
          .attr("width", width9)
          .attr("height", height9);

      d3.json("data/toyErgmData9.json", function(error, graph9) {
        if (error) throw error;

        force9
            .nodes(graph9.nodes)
            .links(graph9.links)
            .start();

        var link9 = svg9.selectAll(".link")
            .data(graph9.links)
          .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node9 = svg9.selectAll(".node")
            .data(graph9.nodes)
          .enter().append("circle")
            .attr("class", "node")
            .style("fill", function(d) { return color(d.group); })
            .call(force9.drag);

        node9.append("title")
            .text(function(d) { return d.name; });

        force9.on("tick", function() {
          link9.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node9.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          node9.attr("r", function(d) { return d.value; });
        });
      });
