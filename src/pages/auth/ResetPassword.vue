<template>
    <div class="row">
        <div class="img-password col-7 d-none d-md-block">

        </div>
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
            <RouterLink to="/"><img class="auth-logo-img" src="../../assets/logo.png" alt=""></RouterLink>
            <div class="p-5 px-5 border rounded-5">
                <h1 class="text-uppercase text-center fw-bold">Forgot your <span class="text-primary">Password?</span></h1>
                <form>
                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control p-3" placeholder="Introduce your email">
                    </div>
                    <div class="form-check mt-2">
                        <p>
                            I agree to recive communications from Coach IT
                        </p>
                    </div>

                    <button type="submit" class="text-uppercase btn btn-primary mt-5 rounded-4 w-100">Send mail</button>

                </form>
            </div>

            <RouterLink to="/" class="mt-5">Home</RouterLink>
        </div>
    </div>
</template>
 
<script setup>

</script>
 
<style scoped></style>