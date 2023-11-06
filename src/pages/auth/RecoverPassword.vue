<template>
    <div class="row">
        <div class="img-password col-7 d-none d-md-block">

        </div>
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
            <RouterLink to="/"><img class="auth-logo-img" src="../../assets/logo.png" alt=""></RouterLink>
            <div class="p-5 px-5 border rounded-5">
                <h1 class="text-uppercase text-center fw-bold">Reset your<span class="text-primary">Password?</span></h1>
                <p>Introduce your new password</p>
                <form>
                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control p-3" placeholder="Introduce your password">
                    </div>
                    <div class="form-group mt-5">
                        <label for="password">Confirm password</label>
                        <input type="password" id="password" class="form-control p-3" placeholder="Repeat your password">
                    </div>

                    <button type="submit" class="text-uppercase btn btn-primary mt-5 rounded-4 w-100">Reset password</button>

                </form>
            </div>

            <RouterLink to="/" class="mt-5">Home</RouterLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>