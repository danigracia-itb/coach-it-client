<template>
   <div class="row">
        <div class="img-auth vh-100 col-5 d-none d-md-block">

        </div>
        <div class="col-md-7 d-flex flex-column align-items-center justify-content-center">
            <img class="auth-logo-img" src="../../assets/logo.png" alt="">
            <div class="border rounded p-5">
                <h1 class="text-uppercase text-center fw-bold">Forgot four <span class="text-primary">password?</span></h1>
                <p>Introduce your mail to recover your password</p>
                <form class="text-center">
                    <div class="form-group mt-5">
                        <label for="email" class="text-uppercase fw-bold">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Introduce your email">
                    </div>

                    <button type="submit" class="text-uppercase btn btn-primary mt-5">Send mail</button>

                </form>
            </div>
            <RouterLink to="/" class="mt-5">Home</RouterLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>