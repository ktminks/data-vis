// map.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import * as d3 from 'd3';
import { DataService } from '../data.service';
// import * as topojson from 'topojson-client';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  data: Array<{ count: number, year: number }> = [];

  private svg = this.mapContainer.nativeElement;
  private width: number = 0;
  private height: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.width = this.mapContainer.nativeElement.offsetWidth;
    this.height = this.mapContainer.nativeElement.offsetHeight;
    this.initSvg();
    // this.drawMap();
  }

  private initSvg(): void {
    this.svg = d3.select(this.mapContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

//   private drawMap(): void {
//     const projection: d3.GeoProjection = d3.geoMercator().fitSize([this.width, this.height], { type: 'Sphere' });
//     const path: d3.GeoPath<any, d3.GeoPermissibleObjects> = d3.geoPath().projection(projection);

//     this.dataService.getTopology().subscribe(topology: Observable<any> => {
//       const countriesFeatureCollection = topojson.feature(topology, topology.objects.countries) as d3.geo.FeatureCollection;
//       this.svg.selectAll('path')
//         .data(countriesFeatureCollection.features)
//         .enter()
//         .append('path')
//         .attr('d', (d: d3.GeoPermissibleObjects) => path(d) as string)
//         .attr('class', 'country');
//     });
//   }
}        