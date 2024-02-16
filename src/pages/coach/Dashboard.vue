<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Dashboard</h1>

            <Spinner class="mt-5" v-if="configStore.loading" />

            <div
                class="d-flex justify-content-between mt-5 mt-md-0"
                v-if="!configStore.loading"
            >
                <input
                    type="text"
                    id="searchTerm"
                    class="form-control w-auto"
                    placeholder="Search athlete..."
                    v-model="searchInput"
                />
                <InviteAthlete />
            </div>
        </header>

        <div class="athletes-grid h-100 w-100 mt-5" v-if="!configStore.loading && coachStore.athletes.length > 0">

            <AthleteCard
                v-for="athlete in filteredAthletes"
                :key="athlete.id"
                :athlete="athlete"
            />
        </div>
        <div class="w-100 mt-5" v-if="!configStore.loading && coachStore.athletes.length <= 0">
            <h4 class="text-center">You have no athletes, <span class="cursor-pointer text-primary" @click="inviteAthlete(host, authStore.id)">invite your first athlete</span></h4>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { inviteAthlete } from "../../functions/alerts";

// Components
import Spinner from "../../components/utils/Spinner.vue";
import InviteAthlete from "../../components/coach/InviteAthlete.vue";
import AthleteCard from "../../components/coach/athletes/AthleteCard.vue";

// Stores
import useConfigStore from "../../stores/useConfigStore";
import useCoachStore from "../../stores/useCoachStore";
import useAuthStore from "../../stores/useAuthStore";

// Controllers
import coachController from "../../controllers/coachController";

const coachStore = useCoachStore();
const configStore = useConfigStore();
const authStore = useAuthStore();
const searchInput = ref("");

const host = window.location.host

onMounted(() => {
    if (coachStore.athletes.length <= 0) {
        coachController.getAthletes();
    }
});

const filteredAthletes = computed(() => {
    const searchTerm = searchInput.value.trim(); 
    const lowercaseSearchTerm = searchTerm.toLowerCase(); 
    return coachStore.athletes.filter(athlete => {
        const lowercaseName = athlete.name.toLowerCase(); 
        return lowercaseName.includes(lowercaseSearchTerm); 
    });
});
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
