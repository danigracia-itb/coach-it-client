<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Dashboard</h1>

            <Spinner class="mt-5" v-if="configStore.loading" />

            <div
                class="d-flex justify-content-between"
                v-if="!configStore.loading"
            >
                <input
                    type="text"
                    id="searchTerm"
                    placeholder="Search athlete..."
                    v-model="searchInput"
                />
                <InviteAthlete />
            </div>
        </header>

        <div class="athletes-grid h-100 w-100 mt-5" v-if="!configStore.loading">
            <AthleteCard
                v-for="athlete in coachStore.getFilteredAthletes(searchInput)"
                :key="athlete.id"
                :athlete="athlete"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

//Components
import Spinner from "../../components/utils/Spinner.vue";
import InviteAthlete from "../../components/coach/InviteAthlete.vue";
import AthleteCard from "../../components/coach/athletes/AthleteCard.vue";

//Stores
import useConfigStore from "../../stores/useConfigStore";
import useCoachStore from "../../stores/useCoachStore";

//Controllers
import coachController from "../../controllers/coachController";

const coachStore = useCoachStore();
const configStore = useConfigStore();
const searchInput = ref("");

onMounted(() => {
    if (coachStore.athletes.length <= 0) {
        coachController.getAthletes();
    }
});

// const filteredAthletes = computed(() => {
//     const searchTerm = searchInput.value.toLowerCase().trim();
//     if (!searchTerm) {
//         return coachStore.athletes;
//     } else {
//         return coachStore.athletes.filter((athlete) =>
//             athlete.name.toLowerCase().includes(searchTerm)
//         );
//     }
// });
</script>

<style scoped>
.athletes-grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .athletes-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
}
</style>
