<script setup lang="ts">
  import { ref } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import type { I18nString } from "~/types/util/I18nString"
  import { useTranslate } from "~/composables/useTranslate"

  withDefaults(
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
      titleTag?: "h1" | "h2"
      titleClass?: string
      submitVariant?: "default" | "kontakt"
    }>(),
    {
      titleClass: "mb-6 text-2xl font-bold text-ps-dark",
      submitVariant: "default",
    },
  )

  const t = useTranslate()

  const form = ref({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    interest: "",
    learner_type: "",
    message: "",
  })

  const status = ref<"idle" | "loading" | "success" | "error">("idle")

  async function onSubmit() {
    status.value = "loading"
    try {
      await $fetch("/api/contacts", {
        method: "POST",
        body: form.value,
      })
      status.value = "success"
      form.value = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        interest: "",
        learner_type: "",
        message: "",
      }
    } catch {
      status.value = "error"
    }
  }
</script>

<template>
  <div>
    <component :is="titleTag === 'h1' ? 'h1' : 'h2'" :class="titleClass">
      {{ t(title) }}
    </component>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-1">
          <span class="sr-only">{{ t(labels.firstName) }}</span>
          <input
            v-model="form.first_name"
            type="text"
            required
            :placeholder="t(labels.firstName)"
            class="border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark placeholder:text-ps-dark/60"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="sr-only">{{ t(labels.lastName) }}</span>
          <input
            v-model="form.last_name"
            type="text"
            required
            :placeholder="t(labels.lastName)"
            class="border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark placeholder:text-ps-dark/60"
          />
        </label>
      </div>

      <label class="flex flex-col gap-1">
        <span class="sr-only">{{ t(labels.email) }}</span>
        <input
          v-model="form.email"
          type="email"
          required
          :placeholder="t(labels.email)"
          class="border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark placeholder:text-ps-dark/60"
        />
      </label>

      <label class="flex flex-col gap-1">
        <span class="sr-only">{{ t(labels.phone) }}</span>
        <input
          v-model="form.phone"
          type="tel"
          :placeholder="t(labels.phone)"
          class="border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark placeholder:text-ps-dark/60"
        />
      </label>

      <label class="flex flex-col gap-1">
        <span class="text-xs text-ps-dark/60">{{ t(labels.interest) }}</span>
        <select
          v-model="form.interest"
          required
          class="border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark"
        >
          <option value="" disabled selected hidden />
          <option
            v-for="opt of interestOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ t(opt.label) }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1">
        <span class="text-xs text-ps-dark/60">{{ t(labels.learnerType) }}</span>
        <select
          v-model="form.learner_type"
          required
          class="border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark"
        >
          <option value="" disabled selected hidden />
          <option
            v-for="opt of learnerTypeOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ t(opt.label) }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1">
        <span class="sr-only">{{ t(labels.message) }}</span>
        <textarea
          v-model="form.message"
          rows="4"
          :placeholder="t(labels.message)"
          class="resize-none border-b border-black/20 bg-transparent py-2 text-sm text-ps-dark placeholder:text-ps-dark/60"
        />
      </label>

      <ButtonV
        v-if="submitVariant === 'default'"
        submit
        variant="primary"
        class="self-start px-[35px]"
        :disabled="status === 'loading'"
      >
        {{ t(labels.submit) }}
      </ButtonV>
      <button
        v-else
        type="submit"
        :disabled="status === 'loading'"
        class="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-[20px] bg-ps-blue px-[35px] py-2 text-sm font-semibold text-white transition hover:bg-ps-blue/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ps-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ t(labels.submit) }}
        <NuxtImg
          src="/images/angebote/icon-arrow-up-right.svg"
          alt=""
          class="h-5 w-5 brightness-0 invert"
          width="20"
          height="20"
          aria-hidden="true"
        />
      </button>

      <p v-if="status === 'success'" class="text-sm text-ps-green">
        {{ t(successMessage) }}
      </p>
      <p v-if="status === 'error'" class="text-red-600 text-sm">
        {{ t(errorMessage) }}
      </p>
    </form>
  </div>
</template>
