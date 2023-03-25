// d3-geo-map.ts
import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

export class D3GeoMap {
  private svg = this.container.nativeElement;
  private projection!: d3.GeoProjection;
  private path!: d3.GeoPath<any, d3.GeoPermissibleObjects>;

  constructor(private container: ElementRef) {
    this.initSvg();
    this.initProjection();
  }

  setData(data: { count: number; year: number }[]): void {
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

  private initProjection(): void {
    this.projection = d3.geoNaturalEarth1();
    this.path = d3.geoPath().projection(this.projection);
  }

  private render(data: { count: number; year: number }[]): void {
    d3.json('https://unpkg.com/world-atlas@2.0.1/world/110m.json').then(
      (topology: any) => {
        const countries = feature(
          topology,
          topology.objects.countries
        ).features;

        this.svg
          .selectAll('path')
          .data(countries)
          .enter()
          .append('path')
          .attr('d', this.path)
          .attr('fill', 'lightgray')
          .attr('stroke', 'black');
      }
    );
  }
}
