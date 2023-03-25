// d3-line-graph.ts
import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class D3LineGraph {
  private svg = this.container.nativeElement;
  private xScale!: d3.ScaleLinear<number, number>;
  private yScale!: d3.ScaleLinear<number, number>;

  constructor(private container: ElementRef) {
    this.initSvg();
  }

  setData(data: { count: number; year: number }[]): void {
    this.updateScales(data);
    this.render(data);
  }

  show(): void {
    this.svg.style('display', 'block');
  }

  hide(): void {
    this.svg.style('display', 'none');
  }

  private initSvg(): void {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    this.svg = d3
      .select(this.container.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  private updateScales(data: { count: number; year: number }[]): void {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    this.xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.year) as [number, number])
      .range([0, width]);

    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.count) as number])
      .range([height, 0]);
  }
  private render(data: { count: number; year: number }[]): void {
    const lineGenerator = d3
      .line<{ count: number; year: number }>()
      .x(d => this.xScale(d.year))
      .y(d => this.yScale(d.count));

    this.svg
      .append('path')
      .datum(data)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);
  }
}