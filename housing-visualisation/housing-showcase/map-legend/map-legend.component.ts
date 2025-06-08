import { Component, input } from '@angular/core';

@Component({
  selector: 'app-map-legend',
  imports: [],
  templateUrl: './map-legend.component.html',
  styleUrl: './map-legend.component.scss'
})
export class MapLegendComponent {
  title = input<string>('Legend');
  subtitle = input<string>('');
  items = input<{ color: string; label: string }[]>([])

}
