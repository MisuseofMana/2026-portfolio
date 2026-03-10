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
    <UPageSection v-if="page.faq?.list?.length">
      <LandingFAQ :page="page" />
    </UPageSection>
  </UPage>
</template>
