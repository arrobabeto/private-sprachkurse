<script setup lang="ts">
  import ContactFormBody from "~/components/sections/_ContactFormBody.vue"
  import type { I18nString } from "~/types/util/I18nString"

  defineOptions({ name: "SectionKontaktForm" })

  defineProps<{
    portraitImage: string
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
  <section id="kontakt" class="scroll-mt-24 bg-white px-[2.5%] py-12 md:py-16">
    <div class="mx-auto max-w-[1276px]">
      <div
        class="grid items-start gap-10 lg:grid-cols-[400px_minmax(0,788px)] lg:justify-between lg:gap-[59px]"
      >
        <NuxtImg
          :src="portraitImage"
          alt=""
          class="mx-auto h-auto w-full max-w-[400px] rounded-[46px] object-cover lg:mx-0 lg:min-h-[653px]"
          width="400"
          height="653"
          sizes="(max-width: 1024px) 90vw, 400px"
          loading="lazy"
        />

        <div
          class="w-full rounded-[20px] bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.2)] md:p-14"
        >
          <ContactFormBody
            :title="title"
            :labels="labels"
            :interest-options="interestOptions"
            :learner-type-options="learnerTypeOptions"
            :success-message="successMessage"
            :error-message="errorMessage"
            title-tag="h2"
            title-class="mb-6 text-[28px] font-normal leading-[30px] text-ps-dark"
            submit-variant="kontakt"
          />
        </div>
      </div>
    </div>
  </section>
</template>
