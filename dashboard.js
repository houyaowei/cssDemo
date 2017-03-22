 function init() {
     //记录放大的级别
     var expandLevel = 1;

     var $ = go.GraphObject.make;
     myDiagram =
         $(go.Diagram, "dashboardDiv", {
             contentAlignment: go.Spot.Center
         });
     myDiagram.nodeTemplate =
         $(go.Node, "Auto", {
                 locationSpot: go.Spot.Center
             },
             new go.Binding("location", "loc", go.Point.parse),
             $(go.Shape, "Ellipse", {
                     fill: "transparent"
                 },
                 new go.Binding("stroke", "color"),
                 new go.Binding("strokeWidth", "width")),
             $("HyperlinkText",
                 function(node) {
                     return "https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(node.data.text);
                 },
                 function(node) {
                     return node.data.text;
                 }, {
                     margin: 1,
                     maxSize: new go.Size(50, 50),
                     textAlign: "center"
                 })
         );

     myDiagram.nodeTemplateMap.add("center",
         $(go.Node, "Spot", {
                 locationSpot: go.Spot.Center,
                 click: expandCircle
             },
             new go.Binding("location", "loc", go.Point.parse),
             $(go.Panel, "Spot",
                 $(go.Shape, "Circle", {
                         isPanelMain: true,
                         fill: "transparent",
                         portId: ""
                     },
                     new go.Binding("stroke", "hicolor"),
                     new go.Binding("strokeWidth", "hiwidth")),
                 $(go.Shape, "Circle", {
                         isPanelMain: true,
                         fill: "transparent"
                     },
                     new go.Binding("stroke", "color"),
                     new go.Binding("strokeWidth", "width")),
                 $("HyperlinkText",
                     function(node) {
                         return "https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(node.data.text);
                     },
                     function(node) {
                         return node.data.text;
                     }, {
                         margin: 1,
                         maxSize: new go.Size(80, 80),
                         textAlign: "center"
                     })
             )
         ));
     var thirdLevelTemplate = $(go.Node, "Spot", {
             locationSpot: go.Spot.Center
         },
         new go.Binding("location", "loc", go.Point.parse),
         $(go.Shape, "Circle", {
             fill: "rgba(128,128,128,0.1)",
             stroke: null,
             width: 260,
             height: 260
         }),
         $(go.Shape, "Circle", {
             fill: "rgba(128,128,128,0.1)",
             stroke: null,
             width: 160,
             height: 160
         }),
         $(go.Shape, "Circle", {
             fill: "rgba(128,128,128,0.05)",
             stroke: null,
             width: 80,
             height: 80
         }), $(go.Panel, "Spot",
             $(go.Shape, "Circle", {
                     isPanelMain: true,
                     fill: "transparent",
                     portId: ""
                 },
                 new go.Binding("stroke", "hicolor"),
                 new go.Binding("strokeWidth", "hiwidth")),
             $(go.Shape, "Circle", {
                     isPanelMain: true,
                     fill: "transparent"
                 },
                 new go.Binding("stroke", "color"),
                 new go.Binding("strokeWidth", "width")),
             $("HyperlinkText",
                 function(node) {
                     return "https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(node.data.text);
                 },
                 function(node) {
                     return node.data.text;
                 }, {
                     margin: 1,
                     maxSize: new go.Size(80, 80),
                     textAlign: "center"
                 })
         ));
     var secondLevelTemplate = $(go.Node, "Spot", {
             locationSpot: go.Spot.Center
         },
         new go.Binding("location", "loc", go.Point.parse),
         $(go.Shape, "Circle", {
             fill: "rgba(128,128,128,0.1)",
             stroke: null,
             width: 160,
             height: 160
         }),
         $(go.Shape, "Circle", {
             fill: "rgba(128,128,128,0.05)",
             stroke: null,
             width: 80,
             height: 80
         }), $(go.Panel, "Spot",
             $(go.Shape, "Circle", {
                     isPanelMain: true,
                     fill: "transparent",
                     portId: ""
                 },
                 new go.Binding("stroke", "hicolor"),
                 new go.Binding("strokeWidth", "hiwidth")),
             $(go.Shape, "Circle", {
                     isPanelMain: true,
                     fill: "transparent"
                 },
                 new go.Binding("stroke", "color"),
                 new go.Binding("strokeWidth", "width")),
             $("HyperlinkText",
                 function(node) {
                     return "https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(node.data.text);
                 },
                 function(node) {
                     return node.data.text;
                 }, {
                     margin: 1,
                     maxSize: new go.Size(80, 80),
                     textAlign: "center"
                 })
         ));
     myDiagram.nodeTemplateMap.add("secondLevel", secondLevelTemplate);
     myDiagram.nodeTemplateMap.add("thirdLevel", thirdLevelTemplate);
     //点击node节点放大
     function expandCircle(event, obj) {
         var node = obj.part;
         if (node) {
             var diagram = event.diagram;
             diagram.startTransaction("expand");
             var preview = diagram.model.getCategoryForNodeData(node.data);
             expandLevel++;
             if (1 == expandLevel) {
                 preview = "center"
             }
             if (2 == expandLevel) {
                 preview = "secondLevel";
             }
             if (3 == expandLevel) {
                 expandLevel = 0;
                 preview = "thirdLevel";
             }
             diagram.model.setCategoryForNodeData(node.data, preview);
             diagram.commitTransaction("expand");
             diagram.zoomToFit();
         }
     }
     myDiagram.linkTemplate =
         $(go.Link,
             $(go.Shape,
                 new go.Binding("stroke", "color"),
                 new go.Binding("strokeWidth", "width"),
                 new go.Binding("strokeDashArray", "dash")),
             $(go.Shape, {
                 toArrow: "Standard",
                 stroke: "#888"
             })
         );

     var nodeDataArray = [{
         key: 1,
         text: "源",
         loc: "20 100",
         hicolor: "lightblue",
         hiwidth: 7,
         category: "center"
     }, {
         key: 2,
         text: "前置区",
         loc: "300 100",
         category: "center",
         hicolor: "lightblue",
         hiwidth: 7
     }, {
         key: 3,
         text: "共享",
         loc: "600 100",
         category: "center",
         hicolor: "lightblue",
         hiwidth: 7
     }, {
         key: 4,
         text: "消费方",
         loc: "900 100",
         category: "center",
         hicolor: "lightblue",
         hiwidth: 7
     }];
     var linkDataArray = [{
             from: 1,
             to: 2,
             color: "gray"
         }, {
             from: 2,
             to: 3,
             color: "gray"
         }, {
             from: 3,
             to: 4,
             color: "gray"
         }

     ];
     myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

 }