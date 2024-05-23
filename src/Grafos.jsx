import { Grid, Button, Box, Typography } from "@mui/material";
import { useState, useRef } from "react";
import Cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import edgehandles from "cytoscape-edgehandles";

function Grafos() {
  const [mode, setMode] = useState("Añadir Vértice");
  const [adjMatrix, setAdjMatrix] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showDegrees, setShowDegrees] = useState(false);
  const [degrees, setDegrees] = useState({});
  const cyRef = useRef(null);

  Cytoscape.use(edgehandles);

  const handleOption = (option) => {
    setMode(option);
    setShowMatrix(false);
    setShowDegrees(false);
  };

  const handleShowMatrix = () => {
    const cy = cyRef.current;
    const nodes = cy.nodes();
    const edges = cy.edges();

    const matrix = Array(nodes.length)
      .fill(null)
      .map(() => Array(nodes.length).fill(0));

    nodes.forEach((node, i) => {
      nodes.forEach((targetNode, j) => {
        if (node.id() === targetNode.id()) {
          const loop = edges.filter(
            (edge) => edge.source().id() === node.id() && edge.target().id() === node.id()
          );
          if (loop.length > 0) {
            matrix[i][j] = 1;
          }
        } else {
          const edgeAB = edges.filter(
            (edge) =>
              edge.source().id() === node.id() && edge.target().id() === targetNode.id()
          );
          const edgeBA = edges.filter(
            (edge) =>
              edge.source().id() === targetNode.id() && edge.target().id() === node.id()
          );
          if (edgeAB.length > 0 || edgeBA.length > 0) {
            matrix[i][j] = 1;
          }
        }
      });
    });

    setAdjMatrix(matrix);
    setShowMatrix(true);
  };

  const handleShowDegrees = () => {
    const cy = cyRef.current;
    const nodes = cy.nodes();

    const nodeDegrees = {};
    nodes.forEach((node) => {
      nodeDegrees[node.data('label')] = node.degree();
    });

    setDegrees(nodeDegrees);
    setShowDegrees(true);
  };

  let charVar = 0;
  const options = ["Añadir Vértice", "Añadir Arista", "Añadir Bucle"];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Box sx={{ width: "80%", height: "700px", background: "white", border: "1px solid grey" }}>
          <CytoscapeComponent
            elements={[]}
            style={{ width: "100%", height: "100%" }}
            cy={(cy) => {
              cyRef.current = cy; // Save the reference to the cytoscape instance
              let defaults = {
                canConnect: function (sourceNode, targetNode) {
                  return !sourceNode.same(targetNode);
                },
                edgeParams: function (sourceNode, targetNode) {
                  return {};
                },
                hoverDelay: 150,
                snap: true,
                snapThreshold: 50,
                snapFrequency: 15,
                noEdgeEventsInDraw: true,
                disableBrowserGestures: true,
              };

              let eh = cy.edgehandles(defaults);

              if (mode === "Añadir Arista") {
                eh.enableDrawMode();
              } else {
                eh.disableDrawMode();
                eh.disable();
                eh.destroy();
                cy.autolock(false);
                cy.autoungrabify(false);
              }

              cy.on("tap", (e) => {
                if (e.target === cy && mode === "Añadir Vértice") {
                  let posX = e.position.x;
                  let posY = e.position.y;

                  cy.add({
                    data: {
                      id: charVar.toString(),
                      label: String.fromCharCode(65 + charVar),
                    },
                    position: { x: posX, y: posY },
                  });

                  charVar++;
                }
              });

              cy.on("dblclick", "node", (e) => {
                if (mode === "Añadir Bucle") {
                  const node = e.target;
                  cy.add({
                    data: {
                      id: `edge-${node.id()}`,
                      source: node.id(),
                      target: node.id(),
                    },
                  });
                }
              });
            }}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", marginBottom: 5, marginTop: 3 }}>
        <Grid container justifyContent="center" spacing={2}>
          {options.map((opt, index) => (
            <Grid item key={index}>
              <Button variant="contained" sx={{ backgroundColor: "#333", color: "#fff" }} onClick={() => handleOption(opt)}>
                {opt}
              </Button>
            </Grid>
          ))}
          <Grid item>
            <Button variant="contained" sx={{ backgroundColor: "#333", color: "#fff" }} onClick={handleShowMatrix}>
              Matriz de Adyacencia
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ backgroundColor: "#333", color: "#fff" }} onClick={handleShowDegrees}>
              Ver Grados
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showMatrix && (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="h6">Matriz de Adyacencia</Typography>
          <Box component="table" sx={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th" sx={{ border: "1px solid black", padding: "5px" }}></Box>
                {adjMatrix.map((_, index) => (
                  <Box component="th" sx={{ border: "1px solid black", padding: "5px" }} key={index}>
                    {String.fromCharCode(65 + index)}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {adjMatrix.map((row, rowIndex) => (
                <Box component="tr" key={rowIndex}>
                  <Box component="th" sx={{ border: "1px solid black", padding: "5px" }}>
                    {String.fromCharCode(65 + rowIndex)}
                  </Box>
                  {row.map((cell, cellIndex) => (
                    <Box component="td" sx={{ border: "1px solid black", padding: "5px" }} key={cellIndex}>
                      {cell}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      {showDegrees && (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="h6">Grados de los Vértices</Typography>
          <Box component="table" sx={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th" sx={{ border: "1px solid black", padding: "5px" }}>Vértice</Box>
                <Box component="th" sx={{ border: "1px solid black", padding: "5px" }}>Grado</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {Object.entries(degrees).map(([node, degree]) => (
                <Box component="tr" key={node}>
                  <Box component="td" sx={{ border: "1px solid black", padding: "5px" }}>
                    {node}
                  </Box>
                  <Box component="td" sx={{ border: "1px solid black", padding: "5px" }}>
                    {degree}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Grafos;
