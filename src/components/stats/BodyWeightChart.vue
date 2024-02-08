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
};
const series = [
    {
        name: "Body Weight",
        data: data.map((item) => parseFloat(item.value)),
    },
];
</script>
