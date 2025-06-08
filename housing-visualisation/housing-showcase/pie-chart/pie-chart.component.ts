import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType , ArcElement, PieController, Legend, Title, Tooltip} from 'chart.js';

Chart.register(ArcElement, PieController, Legend, Title, Tooltip); // ArcElement, Tooltip, Legend, Title, 

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('pieCanvas')
  public pieChart!: any;

  totalPopulation = 123000;

  ngAfterViewInit(): void {
    const data = {
      labels: ['Detached Houses', 'Townhouses/medium density', 'Apartments (>3 storeys)'],
      datasets: [
        {
          label: 'My Pie Chart',
          data: [0.764, 0.084, 0.151],
          backgroundColor: ['#fcffa4', '#f1605d', '#932667'],
        }
      ]
    };

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start'
          },
          tooltip: {
            enabled: true, // default is true
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const percent = parseFloat(context.formattedValue) *100;
                const population = Math.floor(121054 * parseFloat(context.formattedValue))
                return `${percent}% 
                ${population} people`; // customize text
              }
            }
          }
          // title: {
          //   display: true,
          //   text: 'Housing type Kuringgai (% population 2021)'
          // }
        }
      }
    };

    const ctx = this.chartCanvas()!.nativeElement.getContext('2d');

    this.pieChart = new Chart(ctx!, config);
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }

}
