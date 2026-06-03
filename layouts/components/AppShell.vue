<script setup lang="ts">
  import Footer from "~/layouts/components/Footer.vue"
  import Navigation from "~/layouts/components/Navigation.vue"
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col bg-white text-ps-dark">
    <Navigation />
    <div class="flex-grow">
      <slot />
    </div>
    <Footer />
  </div>
</template>
