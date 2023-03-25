import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from 'd3';
import { D3LineGraph } from './d3-line-graph';
// import { D3GeoMap } from './d3-geo-map';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges {
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;
  @Input() displayMode: 'line' | 'map' = 'line';

  private lineGraph!: D3LineGraph;
  // private geoMap: D3GeoMap;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.lineGraph = new D3LineGraph(this.graphContainer);
    // this.geoMap = new D3GeoMap(this.graphContainer);
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.displayMode) {
    //   this.updateDisplay();
    // }
  }

  // private updateDisplay(): void {
  //   if (this.displayMode === 'line') {
  //     this.lineGraph.show();
  //     this.geoMap.hide();
  //   } else if (this.displayMode === 'map') {
  //     this.lineGraph.hide();
  //     this.geoMap.show();
  //   }
  // }

  private fetchData(): void {
    this.dataService.getPovertyData().subscribe((data: { count: number, year: number }[]) => {
      this.lineGraph.setData(data);
      // this.geoMap.setData(data);
      // this.updateDisplay();
    });
  }
}
