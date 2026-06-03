<script setup lang="ts">
  import { ref } from "vue"
  import ButtonV from "~/components/common/ButtonV.vue"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  defineOptions({ name: "SectionWelcome" })

  const p = defineProps<{
    title: I18nString
    lead: I18nString
    capabilities: {
      title: I18nString
      text: I18nString
      badge?: string
    }[]
    steps: {
      title: I18nString
      text: I18nString
      kind?: "wizard" | "seed"
      code?: string
    }[]
    hasSqlKeyConfigured?: boolean
    apiKeysUrl?: string
  }>()

  const t = useTranslate()
  const installStatus = ref<"idle" | "loading" | "success" | "error">("idle")
  const installMessage = ref(
    "Start the wizard to install schema into your Orbitype workspace.",
  )
  const installResults = ref<
    { table: string; status: string; error?: string }[]
  >([])
  const pendingInstall = ref<"all" | "pages" | "posts" | "settings" | null>(
    null,
  )
  const seedStatus = ref<"idle" | "loading" | "success" | "error">("idle")
  const seedMessage = ref("Seed the homepage into your Orbitype workspace.")

  function installLabel(table: "all" | "pages" | "posts" | "settings") {
    return table === "all" ? "all tables" : `${table} table`
  }

  function requestInstall(table: "all" | "pages" | "posts" | "settings") {
    const firstConfirm = window.confirm(
      `Do you want to prepare installation for ${installLabel(table)}?`,
    )
    if (!firstConfirm) {
      installStatus.value = "idle"
      installMessage.value = "Installation canceled."
      pendingInstall.value = null
      return
    }

    pendingInstall.value = table
    installStatus.value = "idle"
    installMessage.value = `Step 1 of 2: confirm ${installLabel(table)} in the wizard below.`
    installResults.value = []
  }

  function cancelInstallRequest() {
    pendingInstall.value = null
    installStatus.value = "idle"
    installMessage.value = "Installation canceled."
  }

  async function installSchema(table: "all" | "pages" | "posts" | "settings") {
    const browserConfirm = window.confirm(
      `Final confirmation: install ${installLabel(table)} in your Orbitype workspace now?`,
    )
    if (!browserConfirm) {
      cancelInstallRequest()
      return
    }

    installStatus.value = "loading"
    installMessage.value = "Running schema installer..."
    installResults.value = []

    try {
      const response = await $fetch<{
        ok: boolean
        message: string
        results: { table: string; status: string; error?: string }[]
      }>("/api/setup/install-schema", {
        method: "POST",
        body: { table },
      })

      installStatus.value = response.ok ? "success" : "error"
      installMessage.value = response.message
      installResults.value = response.results
      pendingInstall.value = null
    } catch (error: any) {
      installStatus.value = "error"
      installMessage.value =
        error?.data?.statusMessage ??
        error?.statusMessage ??
        error?.message ??
        "Installation failed."
      pendingInstall.value = null
    }
  }

  async function seedHomepage(force = false) {
    if (!p.hasSqlKeyConfigured) {
      seedStatus.value = "error"
      seedMessage.value =
        "Set ORBITYPE_API_SQL_KEY in .env before seeding the homepage."
      return
    }

    const label = force
      ? "overwrite the existing homepage"
      : "seed the homepage"
    const confirmed = window.confirm(
      `Do you want to ${label} in your Orbitype workspace now?`,
    )
    if (!confirmed) {
      seedStatus.value = "idle"
      seedMessage.value = "Homepage seeding canceled."
      return
    }

    seedStatus.value = "loading"
    seedMessage.value = "Seeding homepage..."

    try {
      const response = await $fetch<{
        ok: boolean
        skipped?: boolean
        message: string
      }>("/api/setup/seed", {
        method: "POST",
        body: { force },
      })

      seedStatus.value = response.skipped ? "idle" : "success"
      seedMessage.value = response.message
    } catch (error: any) {
      seedStatus.value = "error"
      seedMessage.value =
        error?.data?.statusMessage ??
        error?.statusMessage ??
        error?.message ??
        "Homepage seeding failed."
    }
  }
</script>

<template>
  <section
    class="welcome-shader relative overflow-hidden px-4 pb-12 pt-14 sm:pb-16 sm:pt-20"
  >
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="shader-blob shader-blob--warm" />
      <div class="shader-blob shader-blob--cool" />
      <div class="shader-blob shader-blob--accent" />
      <div class="shader-sweep" />
      <div class="shader-aura" />
      <div class="shader-grid-overlay" />
    </div>
    <div class="mx-auto w-full max-w-[70%]">
      <div class="mb-10 text-center sm:mb-12">
        <h1
          class="max-w-xl mx-auto text-3xl font-semibold leading-tight text-[#010101] sm:text-4xl dark:text-[#fefefe]"
        >
          {{ t(title) }}
        </h1>
        <p
          class="max-w-lg mx-auto mt-5 text-sm leading-7 text-[#4e4e4e] dark:text-[#cbcbcb]"
        >
          {{ t(lead) }}
        </p>
      </div>

      <div
        class="mb-3 rounded-[1.75rem] border border-[#e0e0e0] bg-[#fefefe]/95 p-3 shadow-2xl shadow-[#010101]/10 backdrop-blur dark:border-[#282a36] dark:bg-[#191a22]/95 dark:shadow-[#010101]/30"
      >
        <div
          class="mb-2 flex items-center justify-between gap-3 rounded-2xl bg-[#f6f6f6] px-4 py-3 dark:bg-[#22232b]"
        >
          <div>
            <h2
              class="text-sm font-semibold text-[#010101] dark:text-[#fefefe]"
            >
              Orbitype template capabilities
            </h2>
            <p class="text-xs text-[#4e4e4e] dark:text-[#cbcbcb]">
              Production-ready features included.
            </p>
          </div>
          <span
            class="rounded-full border border-[#e0e0e0] bg-[#fefefe] px-3 py-1 text-xs text-[#1384ff] dark:border-[#282a36] dark:bg-[#191a22]"
          >
            Orbitype CMS
          </span>
        </div>

        <ul class="grid gap-2 sm:grid-cols-2">
          <li
            v-for="(c, i) of p.capabilities"
            :key="i"
            class="rounded-2xl border border-[#e0e0e0] bg-[#fefefe] p-3 hover:bg-[#f6f6f6] dark:border-[#282a36] dark:bg-[#191a22] dark:hover:bg-[#22232b]"
          >
            <div class="mb-1 flex items-center justify-between gap-2">
              <h3
                class="text-sm font-medium text-[#010101] dark:text-[#fefefe]"
              >
                {{ t(c.title) }}
              </h3>
              <span
                v-if="c.badge"
                class="rounded-full bg-[#f6f6f6] px-2 py-0.5 text-[10px] text-[#4e4e4e] dark:bg-[#22232b] dark:text-[#cbcbcb]"
              >
                {{ c.badge }}
              </span>
            </div>
            <p class="text-xs leading-5 text-[#4e4e4e] dark:text-[#cbcbcb]">
              {{ t(c.text) }}
            </p>
          </li>
        </ul>
      </div>

      <div
        class="rounded-[1.75rem] border border-[#e0e0e0] bg-[#fefefe]/95 p-3 shadow-2xl shadow-[#010101]/10 backdrop-blur dark:border-[#282a36] dark:bg-[#191a22]/95 dark:shadow-[#010101]/30"
      >
        <ol class="space-y-2">
          <li v-for="(s, i) of p.steps" :key="i">
            <details
              class="group rounded-2xl border border-[#e0e0e0] bg-[#fefefe] transition hover:bg-[#f6f6f6] dark:border-[#282a36] dark:bg-[#191a22] dark:hover:bg-[#22232b]"
            >
              <summary
                class="flex cursor-pointer list-none items-center gap-3 px-4 py-3"
              >
                <span
                  class="grid size-7 shrink-0 place-items-center rounded-full bg-[#1384ff] text-xs font-semibold text-white"
                >
                  {{ i + 1 }}
                </span>
                <span
                  class="min-w-0 flex-1 text-sm font-medium text-[#010101] dark:text-[#fefefe]"
                >
                  {{ t(s.title) }}
                </span>
                <span
                  class="text-lg leading-none text-[#4e4e4e] transition group-open:rotate-45 dark:text-[#cbcbcb]"
                >
                  +
                </span>
              </summary>
              <div class="px-4 pb-4 pl-14">
                <p class="text-sm text-[#4e4e4e] dark:text-[#cbcbcb]">
                  {{ t(s.text) }}
                </p>
                <div
                  v-if="s.kind === 'wizard'"
                  class="mt-3 rounded-xl border border-[#e0e0e0] bg-[#f6f6f6] p-3 dark:border-[#282a36] dark:bg-[#22232b]"
                >
                  <div
                    class="mb-3 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <h3
                        class="text-sm font-semibold text-[#010101] dark:text-[#fefefe]"
                      >
                        Guided workspace schema installer
                      </h3>
                      <p
                        class="mt-1 text-xs text-[#4e4e4e] dark:text-[#cbcbcb]"
                      >
                        Wizard flow with two confirmations before SQL is
                        executed.
                      </p>
                    </div>
                    <span
                      class="rounded-full border border-[#e0e0e0] bg-[#fefefe] px-3 py-1 text-xs text-[#4e4e4e] dark:border-[#282a36] dark:bg-[#191a22] dark:text-[#cbcbcb]"
                    >
                      uses ORBITYPE_API_SQL_*
                    </span>
                  </div>

                  <template v-if="p.hasSqlKeyConfigured">
                    <div
                      class="mb-3 grid gap-2 rounded-xl border border-[#e0e0e0] bg-[#fefefe] p-3 dark:border-[#282a36] dark:bg-[#191a22]"
                    >
                      <div class="grid gap-2 sm:grid-cols-4">
                        <ButtonV
                          :disabled="installStatus === 'loading'"
                          @click="requestInstall('all')"
                        >
                          Install all tables
                        </ButtonV>
                        <ButtonV
                          :disabled="installStatus === 'loading'"
                          @click="requestInstall('pages')"
                        >
                          Install pages
                        </ButtonV>
                        <ButtonV
                          :disabled="installStatus === 'loading'"
                          @click="requestInstall('posts')"
                        >
                          Install posts
                        </ButtonV>
                        <ButtonV
                          :disabled="installStatus === 'loading'"
                          @click="requestInstall('settings')"
                        >
                          Install settings
                        </ButtonV>
                      </div>

                      <div
                        class="rounded-lg border border-dashed border-[#e0e0e0] bg-[#f6f6f6] px-3 py-2 text-xs text-[#4e4e4e] dark:border-[#3b3d4b] dark:bg-[#22232b] dark:text-[#cbcbcb]"
                      >
                        <p>
                          <strong>Step 1:</strong>
                          choose what to install.
                        </p>
                        <p>
                          <strong>Step 2:</strong>
                          confirm in wizard and browser prompt.
                        </p>
                      </div>
                    </div>

                    <div
                      v-if="pendingInstall"
                      class="mb-3 rounded-xl border border-[#d8e7ff] bg-[#eef5ff] p-3 dark:border-[#2e4f7a] dark:bg-[#1d2a3d]"
                    >
                      <p
                        class="text-xs font-medium text-[#1558b0] dark:text-[#9ec5ff]"
                      >
                        Confirm installation: {{ installLabel(pendingInstall) }}
                      </p>
                      <p
                        class="mt-1 text-xs text-[#2d4668] dark:text-[#cbcbcb]"
                      >
                        This will run CREATE TABLE IF NOT EXISTS against your
                        Orbitype SQL API.
                      </p>
                      <div class="mt-2 flex flex-wrap gap-2">
                        <ButtonV
                          :disabled="installStatus === 'loading'"
                          @click="installSchema(pendingInstall)"
                        >
                          Yes, continue
                        </ButtonV>
                        <ButtonV
                          :disabled="installStatus === 'loading'"
                          @click="cancelInstallRequest"
                        >
                          Cancel
                        </ButtonV>
                      </div>
                    </div>
                  </template>
                  <div
                    v-else
                    class="rounded-xl border border-[#f3d7a6] bg-[#fff8eb] px-3 py-2 text-xs text-[#7c4a03] dark:border-[#5a3b1f] dark:bg-[#2d2417] dark:text-[#f5d9b2]"
                  >
                    The install wizard is hidden until
                    <code>ORBITYPE_API_SQL_KEY</code>
                    is set in
                    <code>.env</code>
                    .
                  </div>

                  <p class="mt-3 text-xs text-[#4e4e4e] dark:text-[#cbcbcb]">
                    {{ installMessage }}
                  </p>
                  <p
                    class="mt-2 text-xs"
                    :class="
                      p.hasSqlKeyConfigured
                        ? 'text-[#0b7b69] dark:text-[#a4f4e7]'
                        : 'text-[#b45309] dark:text-[#fbbf24]'
                    "
                  >
                    {{
                      p.hasSqlKeyConfigured
                        ? "SQL key detected in .env"
                        : "SQL key missing in .env"
                    }}
                  </p>
                  <p class="mt-1 text-xs text-[#4e4e4e] dark:text-[#cbcbcb]">
                    API key missing? Get one in
                    <a
                      class="underline decoration-dotted underline-offset-2"
                      :href="
                        p.apiKeysUrl ||
                        'https://app.orbitype.com/settings/api-keys'
                      "
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Orbitype settings
                    </a>
                    .
                  </p>

                  <ul
                    v-if="installResults.length > 0"
                    class="mt-3 space-y-1 text-xs"
                  >
                    <li
                      v-for="r of installResults"
                      :key="r.table"
                      class="flex items-start justify-between gap-2 rounded-lg border border-[#e0e0e0] bg-[#fefefe] px-3 py-2 dark:border-[#282a36] dark:bg-[#191a22]"
                    >
                      <span
                        class="font-medium text-[#010101] dark:text-[#fefefe]"
                      >
                        {{ r.table }}
                      </span>
                      <span
                        :class="
                          r.status === 'ok'
                            ? 'text-[#0b7b69] dark:text-[#a4f4e7]'
                            : 'text-[#b91c1c] dark:text-[#fda4af]'
                        "
                      >
                        {{
                          r.status === "ok" ? "installed" : r.error || "error"
                        }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  v-else-if="s.kind === 'seed'"
                  class="mt-3 rounded-xl border border-[#e0e0e0] bg-[#f6f6f6] p-3 dark:border-[#282a36] dark:bg-[#22232b]"
                >
                  <div
                    class="mb-3 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <h3
                        class="text-sm font-semibold text-[#010101] dark:text-[#fefefe]"
                      >
                        Homepage seed
                      </h3>
                      <p
                        class="mt-1 text-xs text-[#4e4e4e] dark:text-[#cbcbcb]"
                      >
                        Inserts bilingual homepage content into the pages table.
                      </p>
                    </div>
                  </div>

                  <template v-if="p.hasSqlKeyConfigured">
                    <div class="grid gap-2 sm:grid-cols-2">
                      <ButtonV
                        :disabled="seedStatus === 'loading'"
                        @click="seedHomepage(false)"
                      >
                        Seed homepage
                      </ButtonV>
                      <ButtonV
                        :disabled="seedStatus === 'loading'"
                        @click="seedHomepage(true)"
                      >
                        Overwrite homepage
                      </ButtonV>
                    </div>
                  </template>
                  <div
                    v-else
                    class="rounded-xl border border-[#f3d7a6] bg-[#fff8eb] px-3 py-2 text-xs text-[#7c4a03] dark:border-[#5a3b1f] dark:bg-[#2d2417] dark:text-[#f5d9b2]"
                  >
                    Seeding is hidden until
                    <code>ORBITYPE_API_SQL_KEY</code>
                    is set in
                    <code>.env</code>
                    .
                  </div>

                  <p
                    class="mt-3 text-xs"
                    :class="{
                      'text-[#4e4e4e] dark:text-[#cbcbcb]':
                        seedStatus === 'idle' || seedStatus === 'loading',
                      'text-[#0b7b69] dark:text-[#a4f4e7]':
                        seedStatus === 'success',
                      'text-[#b91c1c] dark:text-[#fda4af]':
                        seedStatus === 'error',
                    }"
                  >
                    {{ seedMessage }}
                  </p>
                </div>
                <pre
                  v-if="s.code"
                  class="mt-3 overflow-x-auto rounded-xl border border-[#e0e0e0] bg-[#f6f6f6] p-3 text-xs leading-6 text-[#010101] dark:border-[#282a36] dark:bg-[#22232b] dark:text-[#fefefe]"
                ><code>{{ s.code }}</code></pre>
              </div>
            </details>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .welcome-shader {
    background:
      radial-gradient(
        1000px 500px at 20% 0%,
        rgba(250, 241, 227, 0.65),
        transparent 70%
      ),
      radial-gradient(
        900px 460px at 85% 10%,
        rgba(228, 241, 255, 0.65),
        transparent 68%
      );
  }

  .shader-blob {
    position: absolute;
    border-radius: 9999px;
    filter: blur(38px);
    opacity: 0.95;
    mix-blend-mode: screen;
    animation: shader-drift 6.5s linear infinite;
  }

  .shader-blob--warm {
    top: -12rem;
    left: -10rem;
    width: 34rem;
    height: 34rem;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(250, 241, 227, 0.98),
      rgba(19, 132, 255, 0.45)
    );
  }

  .shader-blob--cool {
    right: -11rem;
    bottom: -12rem;
    width: 36rem;
    height: 36rem;
    background: radial-gradient(
      circle at 65% 35%,
      rgba(228, 241, 255, 0.98),
      rgba(43, 88, 118, 0.52)
    );
    animation-delay: -4s;
    animation-duration: 7.5s;
  }

  .shader-blob--accent {
    top: 28%;
    left: 42%;
    width: 28rem;
    height: 28rem;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(19, 132, 255, 0.72),
      rgba(250, 241, 227, 0.15)
    );
    animation: shader-orbit 5.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  }

  .shader-sweep {
    position: absolute;
    inset: -35%;
    background: conic-gradient(
      from 0deg at 50% 50%,
      rgba(19, 132, 255, 0.3),
      rgba(250, 241, 227, 0.08),
      rgba(228, 241, 255, 0.32),
      rgba(19, 132, 255, 0.3)
    );
    mix-blend-mode: soft-light;
    animation: shader-spin 10s linear infinite;
  }

  .shader-aura {
    position: absolute;
    inset: -8%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(19, 132, 255, 0.18),
      transparent 68%
    );
    animation: shader-pulse 3.2s ease-in-out infinite;
  }

  .shader-grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(19, 132, 255, 0.22) 1px, transparent 1px),
      linear-gradient(90deg, rgba(19, 132, 255, 0.22) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.75),
      transparent 88%
    );
    animation: shader-grid-float 4.5s linear infinite;
  }

  @keyframes shader-drift {
    0% {
      transform: translate3d(-65px, 55px, 0) scale(0.96);
    }
    100% {
      transform: translate3d(65px, -55px, 0) scale(1.16);
    }
  }

  @keyframes shader-orbit {
    0% {
      transform: translate3d(-40px, -26px, 0) scale(0.92) rotate(0deg);
    }
    50% {
      transform: translate3d(44px, 36px, 0) scale(1.2) rotate(180deg);
    }
    100% {
      transform: translate3d(-40px, -26px, 0) scale(0.92) rotate(360deg);
    }
  }

  @keyframes shader-spin {
    0% {
      transform: rotate(0deg) scale(1);
    }
    100% {
      transform: rotate(360deg) scale(1.15);
    }
  }

  @keyframes shader-pulse {
    0%,
    100% {
      opacity: 0.4;
      transform: scale(0.92);
    }
    50% {
      opacity: 1;
      transform: scale(1.15);
    }
  }

  @keyframes shader-grid-float {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-36px);
    }
  }
</style>
