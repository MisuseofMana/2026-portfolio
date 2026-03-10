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
      :ui="{
        item: 'border-none',
        trigger: 'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
        trailingIcon: 'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180 text-base text-muted'
      }"
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
