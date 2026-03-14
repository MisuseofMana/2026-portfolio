<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const items = computed(() => {
  return (props.page.faq?.list ?? []).map((item) => {
    return {
      label: item.question,
      content: item.answer,
      key: item.key
    }
  })
})
</script>

<template>
  <UPageSection
    :title="page.faq?.title"
    :ui="{
      container: '!pt-0'
    }"
  >
    <UAccordion
      trailing-icon="lucide:chevron-down"
      :items
      :unmount-on-hide="false"
    >
      <template #body="{ item: _item }">
        <MDC
          class="px-4"
          :value="_item.content"
        />
      </template>
    </UAccordion>
  </UPageSection>
</template>
