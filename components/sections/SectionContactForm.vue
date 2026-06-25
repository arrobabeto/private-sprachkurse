<script setup lang="ts">
  import ContactFormBody from "~/components/sections/_ContactFormBody.vue"
  import type { I18nString } from "~/types/util/I18nString"

  defineProps<{
    title: I18nString
    labels: {
      firstName: I18nString
      lastName: I18nString
      email: I18nString
      phone: I18nString
      interest: I18nString
      learnerType: I18nString
      message: I18nString
      submit: I18nString
    }
    interestOptions: { value: string; label: I18nString }[]
    learnerTypeOptions: { value: string; label: I18nString }[]
    successMessage: I18nString
    errorMessage: I18nString
  }>()
</script>

<template>
  <section id="kontakt" class="scroll-mt-24 py-12 md:py-16">
    <div class="ps-container">
      <div
        class="mx-auto w-[90%] max-w-[800px] rounded-[20px] bg-white p-6 shadow-lg md:p-8"
      >
        <ContactFormBody
          :title="title"
          :labels="labels"
          :interest-options="interestOptions"
          :learner-type-options="learnerTypeOptions"
          :success-message="successMessage"
          :error-message="errorMessage"
          title-tag="h2"
        />
      </div>
    </div>
  </section>
</template>
