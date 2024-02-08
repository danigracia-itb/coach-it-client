import { defineStore, acceptHMRUpdate } from "pinia";

const useCoachStore = defineStore('coach', {
    state: () => ({
        athletes: [],
        athleteCalendar: {
            restDays: [],
            workouts: [],
            bodyWeights: []
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
        setAthleteLastPayment(athlete, data) {
            this.athletes[this.athletes.findIndex((a) => a.id == athlete)].payments = [data]
        },
        deleteAthlete(id) {
            this.athletes = this.athletes.filter(a => a.id != id);
        },
        setAthleteCalendar(data) {
            this.athleteCalendar.restDays = data.restDays
            this.athleteCalendar.workouts = data.workouts
            this.athleteCalendar.bodyWeights = data.bodyWeights
        },
        addBodyWeight(data) {
            this.athleteCalendar.bodyWeights.push(data)
        },
        updateBodyWeight(data) {
            this.athleteCalendar.bodyWeights[this.athleteCalendar.bodyWeights.findIndex((a) => a.id == data.id)] = data;
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export default useCoachStore