// visualization.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {
  displayMode: 'line' | 'map' = 'line';

  constructor() { }

  ngOnInit(): void {
  }
}
