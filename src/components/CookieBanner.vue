<template>
    <div v-if="!cookiesAccepted" class="banner">
        <p>
            We use tracking cookies to understand how you use the product and help us improve it.
            Please accept cookies to help us improve. </p>
        <p class="p1">Look more info from <a href="https://policies.google.com/technologies/cookies?hl=en">Google</a> & <a
                href="https://www.apple.com/legal/privacy/en/cookies/">Apple</a> use of cookies.
        </p>
        <button class="btn btn-primary" type="button" @click="acceptCookies">Accept cookies</button>
        <!-- <button class="btn btn-primary" type="button" @click="declineCookies">Decline cookies</button> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cookiesAccepted = ref(false);

const acceptCookies = () => {
  cookiesAccepted.value = true;
  localStorage.setItem('cookiesAccepted', true);
};

// const declineCookies = () => {
//   cookiesAccepted.value = false;
//   localStorage.removeItem('cookiesAccepted');
// };

onMounted(() => {
  const accepted = localStorage.getItem('cookiesAccepted');
  cookiesAccepted.value = accepted === 'true';
});
</script>


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

.p1 {
    padding-bottom: 10px;
}

.btn {
    margin-left: 20px;
}
</style>