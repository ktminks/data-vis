import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { D3LineGraph } from './d3-line-graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;

  private lineGraph!: D3LineGraph;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.lineGraph = new D3LineGraph(this.graphContainer);
    this.fetchData();
  }

  private fetchData(): void {
    this.dataService.getPovertyData().subscribe((data: { count: number, year: number }[]) => {
      this.lineGraph.setData(data);
    });
  }
}