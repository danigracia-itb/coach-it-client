import { defineStore, acceptHMRUpdate } from "pinia";

const useCoachStore = defineStore('coach', {
    state: () => ({
        athletes: [],
        athleteCalendar: {
            restDays: [],
            workouts: [],
            bodyWeights: [],
            tracs: []
        }
    }),
    getters: {
        getAthleteById: (state) => {
            return (id) => state.athletes.find(a => a.id == id)
        },
        getFilteredAthletes: (state) => {
            return (value) => {
                if (!value) {
                    return state.athletes;
                } else {
                    return state.athletes.filter((athlete) =>
                        athlete.name.toLowerCase().includes(value)
                    );
                }

            }
        }
    },
    actions: {
        setAthletes(data) {
            this.athletes = data
        },
        addAthletePayment(athlete, data) {
            this.athletes[this.athletes.findIndex((a) => a.id == athlete)].payments = [
                ...this.athletes[this.athletes.findIndex((a) => a.id == athlete)].payments,
                data
            ]
        },
        deleteAthlete(id) {
            this.athletes = this.athletes.filter(a => a.id != id);
        },
        setAthleteCalendar(data) {
            this.athleteCalendar.restDays = data.restDays
            this.athleteCalendar.workouts = data.workouts
            this.athleteCalendar.bodyWeights = data.bodyWeights
            this.athleteCalendar.tracs = data.tracs
        },
        addBodyWeight(data) {
            this.athleteCalendar.bodyWeights.push(data)
        },
        updateBodyWeight(data) {
            this.athleteCalendar.bodyWeights[this.athleteCalendar.bodyWeights.findIndex((a) => a.id == data.id)] = data;
        },
        //Trac
        addTrac(data) {
            this.athleteCalendar.tracs.push(data)
        },
        deleteTrac(data) {
            const index = this.athleteCalendar.tracs.findIndex(i => i.id == data.id)
            this.athleteCalendar.tracs.splice(index, 1)
        },
        //Workout
        addWorkout(data) {
            this.athleteCalendar.workouts.push(data)
        },
        deleteWorkout(data) {
            const index = this.athleteCalendar.workouts.findIndex(i => i.id == data.id)
            this.athleteCalendar.workouts.splice(index, 1)
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export default useCoachStore