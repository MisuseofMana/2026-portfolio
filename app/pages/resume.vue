<script setup lang="ts">
const { data: page } = await useAsyncData("resume-page", () => {
  return queryCollection("resume").first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});

const timelineItems = computed(() => {
  const colorToIndicatorClass: Record<string, string> = {
    primary: "bg-primary-500",
    neutral: "bg-neutral-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
    info: "bg-info-500",
  };
  return (page.value?.events ?? []).map((event) => ({
    ...event,
    ui: {
      indicator:
        colorToIndicatorClass[event.color ?? "success"] ?? "bg-success-500",
    },
  }));
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    />
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <MDC :value="page.content" unwrap="p" class="prose" />
      <UTimeline class="w-96" size="3xl" :items="timelineItems">
        <template #indicator="{ item }">
          <UIcon :name="item.icon" class="text-white" />
        </template>
      </UTimeline>
    </UPageSection>
  </UPage>
</template>
