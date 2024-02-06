<template>
    <div>
        <h2>1RM Calculator</h2>

        <!-- Input to enter kilograms -->
        <label for="kgInput">Enter kilograms (max. 1500): </label>
        <input
            type="number"
            id="kgInput"
            v-model="kilograms"
            :max="maxKilograms"
            @input="calculate1RM"
        />
        <span
            v-if="kilograms > maxKilograms || kilograms < 0"
            style="color: red"
        >
            Enter a valid value (0 - 1500)
        </span>

        <!-- Input to enter number of repetitions -->
        <label for="repInput"
            >Enter the number of repetitions (max. 30):
        </label>
        <input
            type="number"
            id="repInput"
            v-model="repetitions"
            :max="maxRepetitions"
            @input="calculate1RM"
        />
        <span
            v-if="repetitions > maxRepetitions || repetitions < 0"
            style="color: red"
        >
            Enter a valid value (0 - 30)
        </span>

        <!-- Table to display the maximum one repetition -->
        <h3>Your maximum one repetition</h3>
        <table>
            <thead>
                <tr>
                    <th>Percentage of 1RM</th>
                    <th>Lifted Weight</th>
                    <th>1RM Repetitions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in maxRepetitionsArray" :key="index">
                    <td>{{ item.percentage }}</td>
                    <td>{{ item.weight }}</td>
                    <td>{{ item.repetitions }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Table to display the percentages of 1RM repetitions -->
        <h3>1RM Repetition Percentages</h3>
        <table>
            <thead>
                <tr>
                    <th>Repetitions</th>
                    <th>Lifted Weight</th>
                    <th>Percentage of 1RM</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in repetitionsArray" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.weight }}</td>
                    <td>{{ item.percentage }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            kilograms: 0,
            repetitions: 0,
            maxKilograms: 1500,
            maxRepetitions: 30,
            maxRepetitionsArray: [],
            repetitionsArray: [],
        };
    },
    methods: {
        calculate1RM() {
            this.maxRepetitionsArray = [];
            this.repetitionsArray = [];

            if (this.kilograms < 0) this.kilograms = 0;
            if (this.repetitions < 0) this.repetitions = 0;

            if (this.kilograms > this.maxKilograms)
                this.kilograms = this.maxKilograms;
            if (this.repetitions > this.maxRepetitions)
                this.repetitions = this.maxRepetitions;

            for (let i = 1; i <= this.maxRepetitions; i++) {
                const oneRM = this.kilograms / (1.0278 - 0.0278 * i);
                const percentage = ((this.kilograms / oneRM) * 100).toFixed(2);
                this.maxRepetitionsArray.push({
                    percentage: percentage + "%",
                    weight: oneRM.toFixed(2) + " Kg",
                    repetitions: i,
                });
                this.repetitionsArray.push({
                    percentage: percentage + "%",
                    weight: (oneRM * (1.0278 - 0.0278 * i)).toFixed(2) + " Kg",
                });
            }
        },
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid black;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>
