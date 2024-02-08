<template>
    <div class="d-flex flex-row gap-2 align-items-center my-auto">
        <span>{{ user.name }}</span>
        <button
            @click="onContextMenu($event)"
            class="border-0 bg-transparent"
        >
            <img
                class="profile-img rounded-circle border border-1 border-secondary bg-white"
                width="50"
                height="50"
                :src="`${backendUrl}/${user.picture}`"
                alt=""
            />
        </button>
    </div>
</template>

<script setup>
import { h, computed } from "vue";
import { useRouter } from "vue-router";
import ContextMenu from "@imengyu/vue3-context-menu";

//stores
import useAuthStore from "../../stores/useAuthStore";

//controllers
import authController from '../../controllers/authController'

const backendUrl = import.meta.env.VITE_API_URL;

const { athlete } = defineProps(["athlete"]);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const router = useRouter();

function onContextMenu(e) {
    //prevent the browser's default menu
    e.preventDefault();
    //show your menu
    ContextMenu.showContextMenu({
        x: e.x,
        y: e.y,
        zIndex: 3,
        items: [
            {
                label: "Profile",
                icon: h("img", {
                    src: "../../../../public/assets/icons/pen-solid.svg",
                    style: {
                        width: "15",
                        height: "15",
                        zIndex: 100,
                    },
                }),

                divided: true,
                onClick: () => {
                    if (athlete) {
                        router.push({
                            path: "/athlete/profile",
                        });
                    } else {
                        router.push({
                            path: "/coach/profile",
                        });
                    }
                },
            },
            {
                label: "Log Out",
                customClass: "text-danger",
                icon: h("img", {
                    src: "../../../../public/assets/icons/right-from-bracket-solid.svg",
                    style: {
                        zIndex: 100,
                        color: "red",
                    },
                }),

                onClick: () => {
                    authController.logout();
                },
            },
        ],
    });
}
</script>
