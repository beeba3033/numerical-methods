import {FunctionComponent} from "react";
import ReactApexChart from "react-apexcharts";

export const ApexChart:FunctionComponent <any> = () =>{
    const series:any = [{ name:"B", data: [10, 41, 35, 51, 49, 62, 69, 91, 148]}] ;
    const options:object = {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: true,
                        type: 'x',
                        autoScaleYaxis: false,
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
                    enabled: true
                },
                stroke: {
                    curve: 'straight'
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
                    categories:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                }
            };
    return(
        <div>

            <ReactApexChart options={options} series={series} type="line" height={350}></ReactApexChart>
        </div>
    );
}