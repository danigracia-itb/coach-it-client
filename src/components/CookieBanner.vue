<template>
    <div class="banner">
        <p>
            We use tracking cookies to understand how you use the product
            and help us improve it.
            Please accept cookies to help us improve.
        </p>
        <button class="btn btn-primary" type="button" @click="acceptCookies">Accept cookies</button>
        <button class="btn btn-primary" type="button" @click="declineCookies">Decline cookies</button>
    </div>
</template>

<script>
/*export default {
    name: "CookieBanner",
    data() {
        return {
            showBanner: true
        };
    },
    methods: {
        acceptCookies() {
            this.$posthog.opt_in_capturing();
            this.hideBanner();
        },
        declineCookies() {
            this.$posthog.opt_out_capturing();
            this.hideBanner();
        },
        hideBanner() {
            this.showBanner = false;
            this.$emit("hideBanner");
        }
    }
};*/
</script>

<style scoped>
.banner {
    position: fixed;
    z-index: 999;
    background-color: #dbdbdbde;
    padding: 20px;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 0;
}

.btn {
    margin-left: 20px;
}
</style>