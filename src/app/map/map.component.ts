import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from 'd3';
import { ElementRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-map',
    template: `
    <svg #svg></svg>
    
      <div #tooltip class="tooltip" [ngStyle]="{'top.px': tooltipY, 'left.px': tooltipX}">{{tooltipText}}</div>
      <div #legend class="legend"></div>
    `,
    styleUrls: ['./map.component.scss']
    })

export class MapComponent implements OnInit {
    private povertyData: any;
    @ViewChild('tooltip') tooltip: ElementRef = {} as ElementRef;
    tooltipX = 0;
    tooltipY = 0;
    tooltipText = '';

    @ViewChild('legend') legend: ElementRef = {} as ElementRef;

    constructor(private dataService: DataService) {}

  ngOnInit() {
    // Get the map data and the poverty data separately
    const mapData$ = this.dataService.getMapData();
    const povertyData$ = this.dataService.getPovertyData();

    // Combine both datasets using the forkJoin operator
    forkJoin([mapData$, povertyData$]).subscribe(([mapData, povertyData]) => {
      this.povertyData = povertyData;
      this.createMap(mapData);
      this.createLegend();
    });
  }

  private createMap(data: any) {
    // Set dimensions
    const width = 960;
    const height = 500;

    // Create a projection
    const projection = d3
      .geoMercator()
      .scale(150)
      .translate([width / 2, height / 2]);

    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Append SVG and set dimensions
    const svg = d3.select('svg').attr('width', width).attr('height', height);

    // Add countries to the map
    svg
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('fill', (d) => this.getCountryColor(d))
      .attr('d', path as any);

// Add event listeners to the country  as anys 
      svg.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('fill', d => this.getCountryColor(d))
      .attr('d', path as any)
      .on('mouseover', d => this.showTooltip(d))
      .on('mousemove', event => this.moveTooltip(event))
      .on('mouseout', () => this.hideTooltip());     
  }

  // Define a color scale and a method to get the appropriate color for each country based on the poverty rate in map.component.ts

  private colorScale = d3
    .scaleQuantize<string>()
    .domain([0, 1])
    .range(d3.schemeBlues[9]);

  private getCountryColor(country: any) {
    // Retrieve the poverty rate for the current country
    const povertyRate = this.getPovertyRate(country);

    // Return the color based on the poverty rate
    return povertyRate !== null ? this.colorScale(povertyRate) : '#ccc';
  }

  private getPovertyRate(country: any): number | null {
    // Find the poverty rate in the dataset for the current country and year
    const povertyData = this.povertyData.find(
      (d: any) => d.countryID === country.properties.countryID
    );
    return povertyData ? povertyData.povertyRate : null;
  }



  private showTooltip(d: any) {
    const povertyRate = this.getPovertyRate(d);
    const countryName = d.properties.countryName;
    
    this.tooltipText = `${countryName}: ${povertyRate ? (povertyRate * 100).toFixed(2) + '%' : 'No data'}`;
    this.tooltip.nativeElement.style.opacity = 1;
    }
    
    private moveTooltip(event: MouseEvent) {
    this.tooltipX = event.pageX + 10;
    this.tooltipY = event.pageY + 10;
    }
    
    private hideTooltip() {
    this.tooltip.nativeElement.style.opacity = 0;
    }

    private createLegend() {
        const legendContainer = d3.select(this.legend.nativeElement);
        legendContainer.append('div')
        .attr('class', 'legend-title')
        .text('Poverty Rate');
        
        const legendItems = legendContainer.selectAll('.legend-item')
        .data(this.colorScale.range())
        .enter()
        .append('div')
        .attr('class', 'legend-item');
        
        legendItems.append('div')
        .attr('class', 'legend-color')
        .style('background-color', d => d);
        
        legendItems.append('span')
        .text((d, i) => {
        const extent = this.colorScale.invertExtent(d);
        return `${(extent[0] * 100).toFixed(0)}% - ${(extent[1] * 100).toFixed(0)}%`;
        });
        }

}
