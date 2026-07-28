<script setup lang="ts">
  import CalculatorModal from "~/components/calculator/CalculatorModal.vue"
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
    <CalculatorModal />
  </div>
</template>
