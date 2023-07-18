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
                    name: "series1",
                    data: [34, 40, 28, 52, 42, 109, 100]
                    },
                    {
                    name: "series2",
                    data: [32, 60, 34, 46, 34, 52, 41]
                    }
                ],
                chartOptions: {
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3
                    },
                    colors: ['#5b73e8', '#F31559'],
                    xaxis: {
                    type: "datetime",
                    categories: [
                        "2018-09-19T00:00:00",
                        "2018-09-19T01:30:00",
                        "2018-09-19T02:30:00",
                        "2018-09-19T03:30:00",
                        "2018-09-19T04:30:00",
                        "2018-09-19T05:30:00",
                        "2018-09-19T06:30:00"
                    ]
                    },
                    grid: {
                    borderColor: "#f1f1f1"
                    },
                    tooltip: {
                    x: {
                        format: "dd/MM/yy HH:mm"
                    }
                    }
                }
            },
        };
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
                                <h4 class="card-title mb-4">Spline Area</h4>
                                <!-- Spline Area chart -->
                                <apexchart class="apex-charts" height="350" type="area" dir="ltr" :series="splineAreaChart.series" :options="splineAreaChart.chartOptions"></apexchart>
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
