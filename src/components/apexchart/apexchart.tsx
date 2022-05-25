import {FunctionComponent} from "react";
import ReactApexChart from "react-apexcharts";
import {PropsApexChart} from "../../methods/methodsproperty";

export const ApexChart:FunctionComponent <PropsApexChart> = (props)  => {
    const series:any = props.Series ;
    const options:object = {
                chart: {
                    height: 800,
                    type: 'line',
                    zoom: {
                        enabled: true,
                        type: 'x',
                        autoScaleYaxis: true,
                        zoomedArea: {
                            fill: {
                                color: '#90CAF9',
                                opacity: 0.4
                            },
                            stroke: {
                                color: '#0D47A1',
                                opacity: 0.4,
                                width: 1
                            }
                        }
                    }

                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories:  props.Categories,
                },
                yaxis: {
                    min:0
                },
                markers: {
                    size: 5,
                    colors: undefined,
                    strokeColors: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 3
                    }
                }
            };
    console.log(series);
    // var chart = new ApexCharts(document.querySelector("#chart"), options);
    return(
            <ReactApexChart options={options} series={series} type="line" height={350}></ReactApexChart>
    );
}