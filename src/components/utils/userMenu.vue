<template>
    <button @click="onContextMenu($event)" class="float-right border-0 bg-transparent">
        <img
            class="profile-img rounded-circle border border-1 border-secondary bg-white"
            width="50"
            :src="user.picture"
            alt=""
        />
    </button>
    <!-- <div class="text-center bg-light">
        <RouterLink
            to="/coach/profile"
            class="text-center border-bottom bg-primary"
        >
            <p class="mt-4 fs-1">
                <font-awesome-icon icon="fa-solid fa-user-pen" /> EDIT PROFILE
            </p>
        </RouterLink>
        <button
            class="bg-danger text-white m-3 mb-4 border-0 p-3"
            @click="logOut(router)"
        >
            LOG OUT
        </button>
    </div> -->
</template>

<script setup>
import {h} from "vue"
import { useRouter } from "vue-router";
import ContextMenu from '@imengyu/vue3-context-menu'
import { logOut, getUser } from "../../functions/helpers";

const user = getUser();
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
                    router.push({
                        path: "/coach/profile",
                    });
                },
            },
            {
                label: "Logout",
                customClass: "text-danger",
                icon: h("img", {
                    src: "../../../../public/assets/icons/right-from-bracket-solid.svg",
                    style: {
                        zIndex: 100,
                        color: "red"
                    },
                }),

                onClick: () => {
                    router.push({
                        path: "/coach/profile",
                    });
                },
            },
        ],
    });
}
</script>
