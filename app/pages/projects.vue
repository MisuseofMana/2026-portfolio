<script setup lang="ts">
const { data: page } = await useAsyncData("projects-page", () => {
  return queryCollection("pages").path("/projects").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData("projects", () => {
  return queryCollection("projects").all();
});

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
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
      <UPageColumns>
        <UPageCard
          v-for="project in projects"
          :key="project.title"
          variant="subtle"
          :to="project.url"
          target="_blank"
          :title="project.title"
          :ui="{ leadingIcon: 'size-10' }"
          class="[--spotlight-size:250px]"
        >
          <template #leading>
            <img
              :src="project.image"
              alt="Crickburrow Archives"
              class="w-full"
            />
          </template>
          <template #description>{{ project.description }}</template>
          <template #footer>
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              :leading-icon="tag.icon"
              color="neutral"
              variant="outline"
              class="text-md mr-1 mb-1"
              :ui="{ leadingIcon: 'size-5 mr-1' }"
            >
              {{ tag.text }}
            </UBadge>
            <UBadge
              color="info"
              leading-icon="i-custom-time"
              variant="outline"
              class="text-md mb-1"
              :ui="{ leadingIcon: 'size-5 mr-1' }"
            >
              {{
                new Date(project.date).toLocaleDateString("default", {
                  month: "short",
                  year: "numeric",
                })
              }}
            </UBadge>
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>
  </UPage>
</template>
