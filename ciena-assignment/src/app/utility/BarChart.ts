import Chart from 'chart.js';

export class BarChart {
    private keys: string[] = [];
    private counts: number[] = [];

    constructor(canvas: any, countPerSeverity: { key: string, count: number }[]) {
        for (const element of countPerSeverity) {
            this.keys.push(element.key);
            this.counts.push(element.count);
        };
        this.createBarChart(canvas);
    }

    private createBarChart(canvas: any) {
        var gradientBarChartConfiguration: any = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            legend: {
              display: false
            },
      
            tooltips: {
              backgroundColor: '#f5f5f5',
              titleFontColor: '#333',
              bodyFontColor: '#666',
              bodySpacing: 4,
              xPadding: 12,
              mode: "nearest",
              intersect: 0,
              position: "nearest"
            },
            responsive: true,
            scales: {
              yAxes: [{
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(29,140,248,0.1)',
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 20,
                  fontColor: "#9e9e9e"
                }
              }],
              xAxes: [{
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(29,140,248,0.1)',
                  zeroLineColor: "transparent",
                },
                ticks: {
                  suggestedMin: 0,
                  precision: 0,
                  padding: 20,
                  fontColor: "#9e9e9e"
                }
              }]
            }
        };
      
        const ctx  = canvas.getContext("2d");
        var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
        gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
    
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            responsive: true,
            legend: {
                display: false
            },
            data: {
                labels: this.keys,
                datasets: [{
                    label: " Count",
                    fill: true,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    borderColor: gradientStroke,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: this.counts
                }]
            },
            options: gradientBarChartConfiguration
        });
    }
}