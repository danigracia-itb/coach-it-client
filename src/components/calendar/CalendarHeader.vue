<template>
    <div class="p-3 bg-primary m-0">
        <div class="d-flex justify-content-between mt-2">
            <span @click="selectPrevious" class="btn text-light">
                <font-awesome-icon icon="fa-solid fa-angle-left" size="2xl" />
            </span>
            <h4
                class="fw-bold calendar-month-header-selected-month text-center mt-2 text-white"
            >
                {{ selectedMonth }}
            </h4>
            <!-- <span @click="selectCurrent" class="btn btn-light">Today</span> -->
            <span @click="selectNext" class="btn text-light">
                <font-awesome-icon icon="fa-solid fa-angle-right" size="2xl"/>
            </span>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
    name: "CalendarModeSelector",

    props: {
        currentDate: {
            type: String,
            required: true,
        },

        selectedDate: {
            type: Object,
            required: true,
        },
    },

    computed: {
        selectedMonth() {
            return this.selectedDate.format("MMMM YYYY");
        },
    },

    methods: {
        selectPrevious() {
            let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
            this.$emit("dateSelected", newSelectedDate);
        },

        selectCurrent() {
            let newSelectedDate = dayjs(this.currentDate);
            this.$emit("dateSelected", newSelectedDate);
        },

        selectNext() {
            let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
            this.$emit("dateSelected", newSelectedDate);
        },
    },
};
</script>
