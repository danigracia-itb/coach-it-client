<template>
    <div>
        <button class="btn btn-primary" @click="inviteAthletePopup">
            <font-awesome-icon
                icon="fa-solid fa-user-plus"
                
            />
        </button>

        <!-- <qrcode-vue :value="`https://${host}/register?type=athlete?code=${code}`" id="swalHTML"></qrcode-vue> -->
    </div>
</template>

<script setup>
import { inviteAthlete } from "../../functions/alerts";
import useAuthStore from "../../stores/useAuthStore";

const authStore = useAuthStore();

const host = window.location.host

function inviteAthletePopup() {
    inviteAthlete(host, authStore.user.id);
}
</script>
