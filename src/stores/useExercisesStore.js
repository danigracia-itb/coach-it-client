import { defineStore, acceptHMRUpdate } from "pinia";

function groupExercises(exercises) {
    return exercises.reduce((acc, exercise) => {
        var groupKey = "No Type";

        switch (parseInt(exercise.muscular_group)) {
            case 1:
                groupKey = "Push";
                break;
            case 2:
                groupKey = "Pull";
                break;
            case 3:
                groupKey = "Leg";
                break;
            case 4:
                groupKey = "Core";
                break;
        }

        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }

        acc[groupKey].push(exercise);

        return acc;
    }, {});
}

const useExercisesStore = defineStore('exercises', {
    state: () => ({
        exercises: []
    }),
    getters: {
        getGroupedExercises: (state) => {
            return groupExercises(state.exercises)
        },
        getExerciseIndex: (state) => {
            return (id) => state.exercises.findIndex((e) => e.id === id)
        },
        getFilteredExercises: (state) => {
            return (value) => {
                if (!value) {
                    return groupExercises(state.exercises);
                } else {
                    const filtered = state.exercises.filter((e) => e.name.toLowerCase().includes(value));

                    if (filtered) {
                        return groupExercises(filtered)
                    } else {
                        return []
                    }

                }
            }
        }
    },
    actions: {
        setExercises(data) {
            this.exercises = data
        },
        addExercise(data) {
            this.exercises.push(data)
        },
        deleteExercise(id) {
            this.exercises = this.exercises.filter(e => e.id != id);
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useExercisesStore, import.meta.hot));
}

export default useExercisesStore