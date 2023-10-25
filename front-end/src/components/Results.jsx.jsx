import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Results = ({ results, onReset }) => {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = results;

    // Créez une fonction pour organiser les données en fonction de la classe (Pclass)
    const groupByClass = (data) => {
      const groupedData = {};
      data.forEach((d) => {
        const key = d.Pclass;
        if (!groupedData[key]) {
          groupedData[key] = 0;
        }
        if (d.Survived === 1) {
          groupedData[key]++;
        }
      });
      return groupedData;
    };

    const groupedData = groupByClass(data);

    // Utilisez les données groupées pour créer le graphique
    const x = d3.scaleBand().domain(Object.keys(groupedData)).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(Object.values(groupedData))]).nice().range([height, 0]);

    svg
      .selectAll('rect')
      .data(Object.entries(groupedData))
      .enter()
      .append('rect')
      .attr('x', ([key]) => x(key))
      .attr('y', ([, value]) => y(value))
      .attr('width', x.bandwidth())
      .attr('height', ([, value]) => height - y(value))
      .attr('fill', '#3384FF'); // Utilisez la couleur que vous préférez

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    return () => {
      d3.select(chartRef.current).select('svg').remove();
    };
  }, [results]);

  return (
    <div>
      <h1>Résultats de la recherche</h1>
      <div ref={chartRef}></div>
      <button onClick={onReset}>Réinitialiser</button>
    </div>
  );
};

export default Results;
