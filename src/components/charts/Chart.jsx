import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {

    function generateDayWiseTimeSeries(baseval, count, yrange) {
        const series = [];
        for (let i = 0; i < count; i++) {
          const x = baseval;
          const y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      
          series.push([x, y]);
          baseval += 86400000; // kunlik vaqt
        }
        return series;
      }
      
    const [state, setState] = useState({

        series: [
            {
                name: 'Sales',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 60
                })
            },
            {
                name: 'Visitors',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 20
                })
            },
            {
                name: 'Products',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                    min: 10,
                    max: 15
                })
            }
        ],
        options: {
            chart: {
                type: 'area',
                height: 350,
                stacked: true,
                events: {
                    selection: function (chart, e) {
                        console.log(new Date(e.xaxis.min))
                    }
                },
            },
            colors: ['#008FFB', '#00E396', '#CED4DC'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'monotoneCubic'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8,
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
        },


    });



    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}


export default ApexChart;