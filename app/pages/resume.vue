<script setup lang="ts">
const { data: page } = await useAsyncData('resume-page', () => {
  return queryCollection('resume').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const timelineItems = computed(() => {
  const colorToIndicatorClass: Record<string, string> = {
    primary: 'bg-primary-500',
    neutral: 'bg-neutral-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    info: 'bg-info-500'
  }
  return (page.value?.events ?? []).map(event => ({
    ...event,
    ui: {
      indicator:
        colorToIndicatorClass[event.color ?? 'success'] ?? 'bg-success-500'
    }
  }))
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
    <UPageSection>
      <MDC
        :value="page.content"
      />
    </UPageSection>

    <UPageSection>
      <MDC
        :value="page.timelineHeading"
      />
      <UTimeline
        size="3xl"
        :items="timelineItems"
        :ui="{
          date: 'float-end ms-1',
          description:
            'px-3 py-2 ring ring-default mt-2 rounded-md text-default'
        }"
      >
        <template #indicator="{ item }">
          <UIcon
            :name="item.icon"
            class="text-white"
          />
        </template>

        <template #date="{ item }">
          {{ item.date }}
        </template>
      </UTimeline>
    </UPageSection>

    <UPageSection>
      <MDC :value="page.accomplishments.content" />
      <UAccordion
        trailing-icon="lucide:chevron-down"
        :items="page.accomplishments.list"
        :unmount-on-hide="false"
      >
        <template #body="{ item: _item }">
          <MDC
            class="px-4"
            :value="_item.description"
          />
        </template>
      </UAccordion>
    </UPageSection>
    <UPageSection>
      <div>
        <MDC
          :value="page.skills.content"
        />
        <div
          v-for="(block, index) in page.skills.blocks"
          :key="block.key ?? index"
          class="mb-15"
        >
          <MDC
            :value="block.content"
          />
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in block.tags"
              :key="tag.text"
              color="neutral"
              :icon="tag.icon"
              variant="soft"
              size="xl"
              class="text-md px-3 py-2 rounded-full"
            >
              {{ tag.text }}
            </UBadge>
          </div>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
