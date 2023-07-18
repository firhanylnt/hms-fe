<script>
/**
 * Dashboard component
 */
export default {
    head() {
        return {
            title: `${this.title} | HMS`,
        };
    },
    data() {
        return {
            title: "Dashboard",
            splineAreaChart : {
                series: [
                    {
                    name: "Net Profit",
                    data: [46, 57, 59, 54, 62, 58, 64, 60, 66]
                    },
                    {
                    name: "Revenue",
                    data: [74, 83, 102, 97, 86, 106, 93, 114, 94]
                    },
                    {
                    name: "Free Cash Flow",
                    data: [37, 42, 38, 26, 47, 50, 54, 55, 43]
                    }
                ],
                chartOptions: {
                    chart: {
                    toolbar: {
                        show: false
                    }
                    },
                    plotOptions: {
                    bar: {
                        dataLabels: {
                        position: "top" // top, center, bottom
                        }
                    }
                    },
                    dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                        return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        fontSize: "12px",
                        colors: ["#000000"]
                    }
                    },
                    colors: ['#F31559', '#4E4FEB', '#6527BE'],
                    grid: {
                    borderColor: "#f1f1f1"
                    },
                    xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],
                    position: "top",
                    labels: {
                        offsetY: -18
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                        type: "gradient",
                        gradient: {
                            colorFrom: "#D8E3F0",
                            colorTo: "#BED1E6",
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5
                        }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        offsetY: -35
                    }
                    },
                    fill: {
                    gradient: {
                        shade: "light",
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [50, 0, 100, 100]
                    }
                    },
                    yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        show: false,
                        formatter: function(val) {
                        return val + "%";
                        }
                    }
                    },
                    title: {
                    text: "Report 2023",
                    floating: true,
                    offsetY: 320,
                    align: "center",
                    style: {
                        color: "#000000"
                    }
                    }
                }
            }
        }
    },
    middleware: "authentication",
};
</script>

<template>
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title mb-4">Report</h4>
                                <!-- Spline Area chart -->
                                <apexchart class="apex-charts" height="300" type="bar" dir="ltr" :series="splineAreaChart.series" :options="splineAreaChart.chartOptions"></apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style></style>
