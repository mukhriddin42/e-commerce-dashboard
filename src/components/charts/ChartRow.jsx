import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChartRow = () => {
    const [state, setState] = useState({
        series: [{
            data: [400, 430, 448, 470, 540] // faqat 5 ta qiymat
        }],
        options: {
            chart: {
                type: 'bar',
                height: 380
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom'
                    },
                }
            },
            colors: ['green', 'blue', 'black', '#13d8aa', '#A5978B'],
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ['#fff']
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ": " + val;
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: ['FaceBook', 'Instagram', 'Google', 'Twitter', 'Other']
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            title: {
                text: 'Marketing Channel',
                floating: true
            },
            tooltip: {
                theme: 'dark',
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function () {
                            return ''
                        }
                    }
                }
            }
        }
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={330} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default ApexChartRow;
