<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(
  () => `index-${route.path}`,
  () => queryCollection('index').first()
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <Motion
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6,
        delay: 0.8
      }"
    >
      <UPageSection
        :ui="{
          container: '!pt-0'
        }"
      >
        <MDC
          :value="page.content"
        />
      </UPageSection>
    </Motion>
    <LandingFAQ :page="page" />
  </UPage>
</template>
