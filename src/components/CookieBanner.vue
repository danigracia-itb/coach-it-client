<template>
    <div v-if="!cookiesAccepted" class="banner">
        <p>
            We use tracking cookies to understand how you use the product and help us improve it.
            Please accept cookies to help us improve. </p>
        <p>Look at info from <a href="https://policies.google.com/technologies/cookies?hl=en">Google</a> & <a
                href="https://www.apple.com/legal/privacy/en/cookies/">Apple</a> use of cookies.
        </p>
        <button class="btn btn-primary" type="button" @click="acceptCookies">Accept cookies</button>
        <button class="btn btn-primary" type="button" @click="declineCookies">Decline cookies</button>
    </div>
</template>

<!--<script>
export default {
    data() {
        return {
            cookiesAccepted: false,
        };
    },
    mounted() {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (cookiesAccepted) {
            this.cookiesAccepted = true;
        }
    },
    methods: {
        acceptCookies() {
            this.cookiesAccepted = true;
            localStorage.setItem('cookiesAccepted', false);
        },
        declineCookies() {
            this.cookiesAccepted = true;
            localStorage.setItem('cookiesAccepted', false);
            console.log(clearLoc)
        },
        handleBeforeUnload() {
            // Borrar el valor de localStorage al reiniciar la página
            localStorage.removeItem('cookiesAccepted');
        },
    },
};
</script>-->

<style scoped>
.banner {
    position: fixed;
    z-index: 999;
    background-color: #c5c5c5f1;
    padding: 20px;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 0;
}

p {

    margin: 10;
}

.btn {
    margin-left: 20px;
}
</style>