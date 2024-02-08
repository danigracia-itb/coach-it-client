<template>
    <div>
        <h4>Body Weight</h4>
        <apexchart
            width="100%"
            type="line"
            :options="options"
            :series="series"
        ></apexchart>
    </div>
</template>

<script setup>
const { data } = defineProps(["data"]);

const options = {
    chart: {
        id: "bodyweight_chart",
    },
    responsive: [
        {
            breakpoint: 768,
            options: {
                plotOptions: {
                    line: {
                        horizontal: false,
                    },
                },
                legend: {
                    position: "bottom",
                },
            },
        },
    ],
    xaxis: {
        categories: data.map((item) => item.date),
    },

    markers: {
        size: 5,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
        hover: {
            size: 8,
            sizeOffset: 3,
        },
    },
};
const series = [
    {
        name: "Body Weight",
        data: data.map((item) => parseFloat(item.value)),
    },
];
</script>
