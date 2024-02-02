<template>
    <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">
                        {{ title }}
                    </h5>
                    <span class="h2 font-weight-bold mb-0">{{ number == 0 ? "-" : number }}</span>
                </div>
                <div class="col-auto">
                    <div
                        class="icon icon-shape text-white rounded-circle shadow"
                        :style="{backgroundColor: color}"
                    >
                    <font-awesome-icon :icon="icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { title, icon,color, number } = defineProps([
    "title",
    "icon",
    "color",
    "number",
]);
</script>

<style>
.icon {
  width: 6rem;
  height: 6rem;
}

.icon svg {
  width: 3.5rem;
  height: 3.5rem;
}

.icon-shape {
  display: inline-flex;
  padding: 12px;
  text-align: center;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.icon-shape svg {
  font-size: 1.25rem;
}
</style>