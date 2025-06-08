import { Component, effect, ElementRef, viewChild } from '@angular/core';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Legend, LinearScale, Title, Tooltip } from 'chart.js';

Chart.register(ArcElement, BarController, Legend, Title, Tooltip, CategoryScale, LinearScale, BarElement); // ArcElement, Tooltip, Legend, Title, 

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('barCanvas');
  public barChart!: any;

  chartCanvasChange = viewChild<ElementRef<HTMLCanvasElement>>('barCanvasChange');
  public barChartChange!: any;

  data = {
    
    labels: ["One person",	"Two persons", 	"Three persons", 	"Four persons", "Five persons",	"Six persons",	"Seven+ persons"],
    datasets: [
      {
        label: '2016',
        
        data: [5.906592195,	20.08541352,	17.64212793,	31.73977111,	16.91770125,	5.478642207,	1.367675217 + 0.861194201],
        backgroundColor: '#2196F3'
      },
      {
        label: '2021',
        data: [6.254064058,	21.18145289,	19.13400137, 	31.38953265,	15.18332027,	5.028594294,	1.191289994	+ 0.638578122],
        backgroundColor: '#1565C0'
      }
    ]
  }

  dataChange = {
    labels: ["One person",	"Two persons", 	"Three persons", 	"Four persons", "Five persons",	"Six persons",	"Seven+ persons"],
    datasets: [
      {
        label: 'Difference 2016 to 2021',
        // label: 'Change in total percent of people living in the following household compositions',
        // data: [5.882780661,	5.456892216,	8.456312341,	-1.10346876,	-10.25187139,	-8.214588503,	-17.9015109],
        data: [0.347471863,	1.096039367,	1.491873441,	-0.350238459,	-1.734380974,	-0.450047913,	-0.176385222-0.222616079],
        backgroundColor: ['#43A047', '#43A047', '#43A047', '#E53935', '#E53935', '#E53935', '#E53935']
      }
    ]
  }

  config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: this.data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: '% Persons in each household composition'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {
          stacked: false
        },
        y: {
          beginAtZero: true
        }
      }
    }
  };

  ngAfterViewInit() {

    const ctx = this.chartCanvas()!.nativeElement.getContext('2d');

    console.log(ctx);
    this.barChart = new Chart(ctx!, this.config);

    const ctxChange = this.chartCanvasChange()!.nativeElement.getContext('2d');
    const configChange = this.getBarStandardConfig(this.dataChange);
    this.barChartChange = new Chart(ctxChange!, configChange);
  }

  getBarStandardConfig(data:any): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: '% Persons in each household composition'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: false,
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: false
          },
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.barChart) {
      this.barChart.destroy();
    }
  }
}
