import { defineStore, acceptHMRUpdate } from "pinia";

const useExercisesStore = defineStore('exercises', {
    state: () => ({
        exercises: []
    }),
    getters: {
        getGroupedExercises: (state) => {
            return state.exercises.reduce((acc, exercise) => {
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
        },
        getExerciseIndex: (state) => {
            return (id) => state.exercises.findIndex((e) => e.id === id)
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