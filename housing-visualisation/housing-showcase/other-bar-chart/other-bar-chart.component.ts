import { Component, effect, ElementRef, viewChild } from '@angular/core';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(ArcElement, BarController, Legend, Title, Tooltip, CategoryScale, LinearScale, BarElement, annotationPlugin); // ArcElement, Tooltip, Legend, Title, 

@Component({
  selector: 'app-other-bar-chart',
  imports: [],
  templateUrl: './other-bar-chart.component.html',
  styleUrl: './other-bar-chart.component.scss'
})
export class OtherBarChartComponent {

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

  ageGroups = ["0-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90-94 years","95-99 years","100 years and over"];

  kurAgeData = {
    labels: this.ageGroups,
    datasets: [
      // Kur
      // {
      //   label: 'Male',
      //   data: [-2920, -4425, -5119, -4697, -3649, -2243, -2282, -3374, -4102, -4383, -4483, -4049, -3388, -2803, -2686, -2196, -1508, -1020, -494, -138, -7],
      //   backgroundColor: 'rgba(54, 162, 235, 0.7)'
      // },
      // {
      //   label: 'Female',
      //   data: [2687,4226,4839,4446,3334,2198,2631,4198,4804,5042,4955,4252,3584,3207,3048,2519,1938,1338,841,273,24],
      //   backgroundColor: 'rgba(255, 99, 132, 0.7)'
      // }
      // Syd
      //       {
      //   label: 'Male',
      //   data: [-160794, -169015, -165443, -152229, -176492, -197024, -204099, -203911, -181586, -169568, -157208, -149478, -133198, -111238, -97631, -69511, -45992, -26169, -11665, -2735, -251],
      //   backgroundColor: 'rgba(54, 162, 235, 0.7)'
      // },
      // {
      //   label: 'Female',
      //   data: [151568,160061,156334,142533,166569,196510,213685,209496,182755,175147,165240,154011,142487,123339,107264,77803,56208,36678,20678,6611,942],
      //   backgroundColor: 'rgba(255, 99, 132, 0.7)'
      // }
      // Aus
      {
        label: 'Male',
        data: [-752557, -814704, -816592, -749330, -806829, -886836, -904395, -901697, -814410, -802516, -787164, -754242, -711159, -625898, -561275, -392637, -252476, -136936, -59159, -13179, -1165],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: 'Female',
        data: [711258,771436,771460,708485,772711,884837,948691,937130,834435,833442,823781,787674,756943,672561,599493,429281,302129,191464,104199,31859,4384],
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      }
    ]
  }

  kurAgeChange = {
    labels: this.ageGroups,
    datasets: [
      {
        label: 'Difference',
        data: [-456,-14,736,-169,318,-23,-303,747,579,-91,407,838,870,310,889,881,375,-50,63,73,6],
        backgroundColor: '#2196F3'
      }
  ]
}

  kurIncome = {
    labels: ["Negative income","Nil income","$1-$149 ($1-$7,799)","$150-$299 ($7,800-$15,599)","$300-$399 ($15,600-$20,799)","$400-$499 ($20,800-$25,999)","$500-$649 ($26,000-$33,799)","$650-$799 ($33,800-$41,599)","$800-$999 ($41,600-$51,999)","$1,000-$1,249 ($52,000-$64,999)","$1,250-$1,499 ($65,000-$77,999)","$1,500-$1,749 ($78,000-$90,999)","$1,750-$1,999 ($91,000-$103,999)","$2,000-$2,999 ($104,000-$155,999)","$3,000-$3,499 ($156,000-$181,999)","$3,500 or more ($182,000 or more)","Not stated","Not applicable"],
    datasets: [
      {
        label: 'Ku-ring-gai',
        data: [415,12156,4147,4183,4380,4387,4996,4967,5435,6696,5674,5748,4754,10960,4223,13311,3716,24203],
        // data:[30504,415513,124166,186291,285635,275064,274989,272810,318036,371753,293822,259866,201091,378426,97983,203102,278894,963205],
        backgroundColor: '#2196F3',
        yAxisID: 'y1',
      },
      {
        label: 'Sydney',
        // data: [415,12156,4147,4183,4380,4387,4996,4967,5435,6696,5674,5748,4754,10960,4223,13311,3716,24203],
        data:[30504,415513,124166,186291,285635,275064,274989,272810,318036,371753,293822,259866,201091,378426,97983,203102,278894,963205],
        backgroundColor: '#FF9800',
        yAxisID: 'y2',
      }
    ]
  }

  configComparison: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: this.kurIncome,
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
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: false
          },
          y1: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ku-ring-gai Count'
            }
          },
          y2: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            grid: {
              drawOnChartArea: false // avoids overlapping grid lines
            },
            title: {
              display: true,
              text: 'Sydney Count'
            }
          }
        }
      }
    }

  configDemo: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: this.kurAgeData,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: '% Persons in each household composition'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            callback: function(value) {
              if (typeof value === 'number') {
                return Math.abs(value); // makes all axis numbers show positive
              } else {
                return 0
              }
            }
          }
        },
        y: {
          beginAtZero: true,
          stacked: true,
          reverse: true,
        }
      }
    }
  };

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

  // comparison between typologies
  barThickness = 50;
  houseTypoCostData = {
    labels: ['Low density', 'Medium density (high-end)', 'Medium density (low-end)', 'High density'],
    datasets: [
      {
        label: 'Land Cost',
        data: [2800000, 1100000, 140000, 140000],
        backgroundColor: 'rgba(14, 116, 144, 0.8)', //'rgba(13, 148, 136, 0.8)' //'rgba(54, 162, 235, 0.6)'
        barThickness: this.barThickness
      },
      {
        label: 'Construction Cost',
        data: [500000, 450000, 225000, 450000],
        backgroundColor: 'rgba(220, 38, 38, 0.8)', //'rgba(255, 99, 132, 0.6)'
        barThickness: this.barThickness
      },
      {
        label: 'Other Costs',
        data: [0,300000,300000,300000],
        backgroundColor: 'rgba(107, 114, 128, 0.8)',
        barThickness: this.barThickness
      },
      // {
      //   label: 'Transportation Cost',
      //   data: [600000, 350000, 100000, 100000],
      //   backgroundColor: 'rgba(245, 158, 11, 0.8)', // 'rgba(96, 165, 250, 0.8)' //
      //   barThickness: this.barThickness
      // }
    ]
  };


    configHouseTypoCost: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: this.houseTypoCostData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          annotation: {
            annotations: {
              thresholdLineKur: {
                type: 'line',
                yMin: 775000,
                yMax: 775000,
                borderColor: 'rgba(0,0,0,0.7)',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  content: 'Affordable to median Ku-ring-gai household',
                  display: true,
                  position: 'start',
                  color: '#000',
                  backgroundColor: '#fff',
                  yAdjust: -16,
                  font: {
                    weight: 'bold'
                  },
                  padding: 4
                }
              },
              thresholdLineMarket: {
                type: 'line',
                yMin: 1060000,
                yMax: 1060000,
                borderColor: 'rgba(0,0,0,0.7)',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  content: 'Current market rate (units)',
                  display: true,
                  position: 'start',
                  color: '#000',
                  backgroundColor: '#fff',
                  yAdjust: -16,
                  font: {
                    weight: 'bold'
                  },
                  padding: 4
                }
              }
            },
          }
        },
        scales: {
          x: { stacked: true },
          y: { 
            stacked: true,
            title: {
              display: true,
              text: 'Cost ($)',
              color: '#374151',
              font: {
                size: 14
              }
            }
          }
        }
      }
    };

  ngAfterViewInit() {

    // stacked bar housing costs
    const landCost = [1100000, 550000, 275000, 140000];
    const constCost = [450000, 300000, 225000, 150000];

    const landLabel = ["3 units", "6 units", "12 units", "16 units"]
    const constLabel = ["150m2", "100m2", "75m2", "50m2"]

    const labels: string[] = [];
    const landData: number[] = [];
    const contrData: number[] = [];

    for (let i = 0; i < landCost.length; i++) {
      for (let j = 0; j < constCost.length; j++) {
        labels.push(`${landLabel[i]} - ${constLabel[j]}`);
        landData.push(landCost[i]);
        contrData.push(constCost[j]);
      }
    }
    const houseCostData = {
      labels,
      datasets: [
        {
          label: 'Land Cost',
          data: landData,
          backgroundColor: 'rgba(14, 116, 144, 0.8)'//'rgba(13, 148, 136, 0.8)' //'rgba(54, 162, 235, 0.6)'
        },
        {
          label: 'Construction Cost',
          data: contrData,
          backgroundColor: 'rgba(220, 38, 38, 0.8)' //'rgba(255, 99, 132, 0.6)'
        }
      ]
    };

    const houseCostChartOptions: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: houseCostData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          annotation: {
            annotations: {
              thresholdLine: {
                type: 'line',
                yMin: 600000,
                yMax: 600000,
                borderColor: 'rgba(0,0,0,0.7)',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  content: 'Affordable to Median Sydney Household',
                  display: true,
                  position: 'end',
                  color: '#000',
                  backgroundColor: '#fff',
                  yAdjust: -16,
                  font: {
                    weight: 'bold'
                  },
                  padding: 4
                }
              },
              thresholdLineMarket: {
                type: 'line',
                yMin: 1060000,
                yMax: 1060000,
                borderColor: 'rgba(0,0,0,0.7)',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  content: 'Current market rate (units)',
                  display: true,
                  position: 'end',
                  color: '#000',
                  backgroundColor: '#fff',
                  yAdjust: -16,
                  font: {
                    weight: 'bold'
                  },
                  padding: 4
                }
              }
              // thresholdLineKur: {
              //   type: 'line',
              //   yMin: 800000,
              //   yMax: 800000,
              //   borderColor: 'rgba(0,0,0,0.7)',
              //   borderWidth: 2,
              //   borderDash: [6, 6],
              //   label: {
              //     content: 'Affordable to median Ku-ring-gai Household',
              //     display: true,
              //     position: 'end',
              //     color: '#000',
              //     backgroundColor: '#fff',
              //     yAdjust: -16,
              //     font: {
              //       weight: 'bold'
              //     },
              //     padding: 4
              //   }
              // }
            }
          }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      }
    };

    // const ctx = this.chartCanvas()!.nativeElement.getContext('2d');

    // console.log(ctx);
    // this.barChart = new Chart(ctx!, this.config);

    const ctxChange = this.chartCanvasChange()!.nativeElement.getContext('2d');
    const configChange = this.getBarStandardConfig(this.kurIncome);
    // this.barChartChange = new Chart(ctxChange!, this.configComparison);
    // this.barChartChange = new Chart(ctxChange!, houseCostChartOptions);
    this.barChartChange = new Chart(ctxChange!, this.configHouseTypoCost);
    
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
