import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { FeatureCollection } from 'geojson';

export class D3GeoMap {
  private svg = this.container.nativeElement;
  private projection!: d3.GeoProjection;
  private path!: d3.GeoPath<any, d3.GeoPermissibleObjects>;
  private geoJSONData!: FeatureCollection;
  private width = this.container.nativeElement.clientWidth;
  private height = this.container.nativeElement.clientHeight;

  constructor(private container: ElementRef) {
    this.initSvg();
    this.initProjection();
  }

  private initSvg(): void {
    this.svg = d3
      .select(this.container.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  private initProjection(): void {
    this.projection = d3.geoEquirectangular()
    .scale(this.width / (2 * Math.PI))
    .translate([this.width / 2, this.height / 2]);
    this.path = d3.geoPath().projection(this.projection);
  }

  private render(data: { count: number; year: number }[]): void {
      // Render the map using the GeoJSON data.
      this.svg.selectAll('path')
        .data(this.geoJSONData.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .attr('fill', '#ccc')
        .attr('stroke', '#000');
  }

  // public setData(data: { count: number; year: number }[]): void {
  //   // this.geoJSONData = data;
  //   // this.render(data);
  // }
  public setGeoJSONData(data: any): void {
    this.geoJSONData = data;
    this.render(data);
  }

}