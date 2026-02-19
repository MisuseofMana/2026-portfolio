<script setup lang="ts"></script>

<template>
  <div>
    <UContainer
      class="sm:border-x border-neutral-800 pt-10 min-h-screen bg-white/90 dark:bg-[#091020]/80"
    >
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
