import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Results = ({ average, stdDeviation, results, onReset, filters }) => {
  const chartRef = useRef();

  // useEffect(() => {
  //   const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  //   const width = 200 - margin.left - margin.right;
  //   const height = 300 - margin.top - margin.bottom;
  
  //   const svg = d3
  //     .select(chartRef.current)
  //     .append('svg')
  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)
  //     .append('g')
  //     .attr('transform', `translate(${margin.left},${margin.top})`);
  
  //   const data = results;
  
  //   const filterData = data.filter((d) => {
  //     if (filters.gender && d.Sex !== filters.gender) return false;
  //     if (filters.age && (d.Age < filters.age || d.Age >= (filters.age))) return false;
  //     if (filters.class && d.Pclass !== parseInt(filters.class)) return false;
  //     return true;
  //   });
  
  //   const groupSurvivor = (data) => {
  //     return filterData.reduce((count, d) => count + d.Survived, 0);
  //   };
  
  //   const survivorsCount = groupSurvivor(filterData);
  
  //   svg
  //     .append('rect')
  //     .attr('x', 0)
  //     .attr('y', height - survivorsCount)
  //     .attr('width', width)
  //     .attr('height', survivorsCount)
  //     .attr('fill', 'steelblue');
  
  //   svg
  //     .append('text')
  //     .attr('x', width / 2)
  //     .attr('y', height - survivorsCount - 10)
  //     .attr('text-anchor', 'middle')
  //     .attr('font-weight', 'bold')
  //     .text(`Survivants : ${survivorsCount}`);
  
  //   return () => {
  //     d3.select(chartRef.current).select('svg').remove();
  //   };
  // }, [results, filters]);

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

    const x = d3.scaleBand().domain(Object.keys(groupedData)).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(Object.values(groupedData))]).nice().range([height, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(Object.keys(groupedData))
      .range(d3.schemeCategory10);

    svg
      .selectAll('rect')
      .data(Object.entries(groupedData))
      .enter()
      .append('rect')
      .attr('x', ([key]) => x(key))
      .attr('y', ([, value]) => y(value))
      .attr('width', x.bandwidth())
      .attr('height', ([, value]) => height - y(value))
      .attr('fill', ([key]) => colorScale(key));
    svg
      .selectAll('text')
      .data(Object.entries(groupedData))
      .enter()
      .append('text')
      .attr('x', ([key]) => x(key) + x.bandwidth() / 2)
      .attr('y', ([, value]) => y(value) - 10)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text(([, value]) => value);  
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => `Class ${d}`));

    svg.append('g').call(d3.axisLeft(y));

    return () => {
      d3.select(chartRef.current).select('svg').remove();
    };
  }, [results]);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 1600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = results;

    const groupByAge = (data) => {
      const groupedData = {};
    
      data.forEach((d) => {
        const age = d.Age;
        if (!isNaN(age) && Number.isInteger(age)) {
          if (!groupedData[age]) {
            groupedData[age] = 0;
          }
          if (d.Survived === 1) {
            groupedData[age]++;
          }
        }
      });
    
      return groupedData;
    };

    const groupedData = groupByAge(data);

    const x = d3.scaleBand().domain(Object.keys(groupedData)).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(Object.values(groupedData))]).nice().range([height, 0]);
    const colorScale = d3.scaleOrdinal()
      .domain(Object.keys(groupedData))
      .range(d3.schemeCategory10);

    svg
      .selectAll('rect')
      .data(Object.entries(groupedData))
      .enter()
      .append('rect')
      .attr('x', ([key]) => x(key))
      .attr('y', ([, value]) => y(value))
      .attr('width', x.bandwidth())
      .attr('height', ([, value]) => height - y(value))
      .attr('fill', ([key]) => colorScale(key));
    svg
      .selectAll('text')
      .data(Object.entries(groupedData))
      .enter()
      .append('text')
      .attr('x', ([key]) => x(key) + x.bandwidth() / 2)
      .attr('y', ([, value]) => y(value) - 10)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text(([, value]) => value);  
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => `${d}`));

    svg.append('g').call(d3.axisLeft(y));

    return () => {
      d3.select(chartRef.current).select('svg').remove();
    };
  }, [results]);

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

    const groupBySex = (data) => {
      const groupedData = {};
    
      data.forEach((d) => {
        const key = d.Sex;
        if (!groupedData[key]) {
          groupedData[key] = 0;
        }
        if (d.Survived === 1) {
          groupedData[key]++;
        }
      });
    
      return groupedData;
    };

    const groupedData = groupBySex(data);

    const x = d3.scaleBand().domain(Object.keys(groupedData)).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(Object.values(groupedData))]).nice().range([height, 0]);
    const colorScale = d3.scaleOrdinal()
      .domain(Object.keys(groupedData))
      .range(d3.schemeCategory10);

    svg
      .selectAll('rect')
      .data(Object.entries(groupedData))
      .enter()
      .append('rect')
      .attr('x', ([key]) => x(key))
      .attr('y', ([, value]) => y(value))
      .attr('width', x.bandwidth())
      .attr('height', ([, value]) => height - y(value))
      .attr('fill', ([key]) => colorScale(key));
    svg
      .selectAll('text')
      .data(Object.entries(groupedData))
      .enter()
      .append('text')
      .attr('x', ([key]) => x(key) + x.bandwidth() / 2)
      .attr('y', ([, value]) => y(value) - 10) // Ajustez la position verticale pour le placer au-dessus de la colonne
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text(([, value]) => value);  
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
    <div className="container">
      <h1 className="mt-3">Résultats de la recherche</h1>
      <div className="d-flex flex-column align-items-center mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Résultats :</h5>
            <p className="card-text">Moyenne : {average}</p>
            <p className="card-text">Écart type : {stdDeviation}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary btn-lg" onClick={onReset}>Réinitialiser</button>
      </div>
    </div>
  );
};

export default Results;
