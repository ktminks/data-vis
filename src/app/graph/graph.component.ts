// graph.component.ts
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;
  @Input() data!: Array<{ count: number, year: number }>;

  private svg = this.graphContainer.nativeElement;
  private width!: number;
  private height!: number;
  private margin: { top: number, right: number, bottom: number, left: number } = { top: 20, right: 20, bottom: 30, left: 50 };

  constructor(private dataService: DataService) {
    this.margin = { top: 20, right: 20, bottom: 30, left: 50 };
  }

  ngOnInit(): void {
    this.width = this.graphContainer.nativeElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.graphContainer.nativeElement.offsetHeight - this.margin.top - this.margin.bottom;
    this.initSvg();
    this.drawGraph();
  }

  private initSvg(): void {
    this.svg = d3.select(this.graphContainer.nativeElement)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

    private drawGraph(): void {
      const xScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
        .domain(d3.extent(this.data, (d: { count: number, year: number }) => d.year) as Iterable<number>)
        .range([0, this.width]);
  
      const yScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
        .domain([0, d3.max(this.data, (d: { count: number, year: number }) => d.count) as number])
        .range([this.height, 0]);

      const xAxis: d3.Axis<number | { valueOf(): number }> = d3.axisBottom(xScale).tickFormat(d3.format('d'));
      const yAxis: d3.Axis<number | { valueOf(): number }> = d3.axisLeft(yScale);
  
      this.svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${this.height})`)
        .call(xAxis);
  
      this.svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);
  
      const line: d3.Line<{ count: number, year: number }> = d3.line<{ count: number, year: number }>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.count));
  
      this.svg.append('path')
        .datum(this.data)
        .attr('class', 'line')
        .attr('d', (d: { count: number, year: number }[]) => line(d) as string);
    }
  }
  