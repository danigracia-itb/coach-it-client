<template>
    <div class="d-flex flex-row gap-2 align-items-center my-auto">
        <!-- <span>{{ user.name }}</span> -->
        <button
            @click="onContextMenu($event)"
            class="border-0 bg-transparent d-flex gap-3 align-items-center"
        >
            <span>{{ authStore.user.name }}</span>
            <img
                class="profile-img rounded-circle border border-1 border-secondary bg-white"
                width="50"
                :src="authStore.user.picture"
                alt=""
            />
        </button>
    </div>
</template>

<script setup>
import { h, ref} from "vue";
import { useRouter } from "vue-router";
import ContextMenu from "@imengyu/vue3-context-menu";
import { logOut } from "../../functions/helpers";

import useAuthStore from "../../stores/useAuthStore";

const authStore = useAuthStore();

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
                        console.log("redirigir a athlete profile");
                    } else {
                        router.push({
                            path: "/coach/profile",
                        });
                    }
                },
            },
            {
                label: "Logout",
                customClass: "text-danger",
                icon: h("img", {
                    src: "../../../../public/assets/icons/right-from-bracket-solid.svg",
                    style: {
                        zIndex: 100,
                        color: "red",
                    },
                }),

                onClick: () => {
                    logOut(router);
                },
            },
        ],
    });
}
</script>
