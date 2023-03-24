import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  template: '<svg #svg></svg>',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTrendsData().subscribe((data) => {
      this.createGraph(data);
    });
  }
  private createGraph(data: any) {
    // Set dimensions, margins, and scales
    const margin = { top: 20, right: 20, bottom: 50, left: 70 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
  
    // Define line generator
    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));
  
    // Append SVG and set dimensions
    const svg = d3
      .select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const [year, count] = data.columns;

    let scale: Number[] = [1960, 2020]
    // Set domains for scales
    x.domain(d3.extent(data.columns, (d: any) => parseInt(d.year)) as [number, number] || scale);
    y.domain([0, parseInt(d3.max(data.columns, (d: any) => d.count) || '5')]);
  
    // Add X and Y axes
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));
  
    // Add line to the graph
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
  
}
