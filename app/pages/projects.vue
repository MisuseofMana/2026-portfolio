<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <UPageColumns>
        <UPageCard
          v-for="project in projects"
          :key="project.title"
          variant="outline"
          :to="project.url"
          target="_blank"
          :title="project.title"
          :ui="{ leadingIcon: 'size-10' }"
        >
          <template #leading>
            <img
              :src="project.image"
              alt="Crickburrow Archives"
              class="w-full"
            >
          </template>
          <template #description>
            <div class="mb-2">
              {{ project.description }}
            </div>
            <div class="flex items-center gap-1 text-success text-sm">
              <UIcon
                name="i-lucide-calendar"
                class="size-5 mr-1"
              />
              {{
                new Date(project.date).toLocaleDateString("default", {
                  month: "short",
                  year: "numeric"
                })
              }}
            </div>
          </template>
          <template #footer>
            <UBadge
              v-for="tag in project.tags"
              :key="tag.icon"
              color="neutral"
              variant="subtle"
              size="md"
              class="text-md mr-1 mb-1"
            >
              <template #leading>
                <UIcon
                  :name="tag.icon"
                  class="size-6 mr-1 shrink-0"
                />
              </template>
              {{ tag.text }}
            </UBadge>
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>
  </UPage>
</template>
