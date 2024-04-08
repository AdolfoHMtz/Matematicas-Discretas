// VennDiagram.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VennDiagram = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Aquí puedes escribir el código para crear el diagrama de Venn utilizando D3.js

    return () => {
      // Limpia cualquier elemento creado cuando el componente se desmonta
      svg.selectAll('*').remove();
    };
  }, []);

  return (
    <svg  alt="j" ref={svgRef} width="500" height="500"></svg>
  );
};

export default VennDiagram;
