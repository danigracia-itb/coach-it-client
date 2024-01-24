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

const host = window.location.host
const code = localStorage.getItem("id")

function inviteAthletePopup() {
    inviteAthlete(host, code);
}
</script>
