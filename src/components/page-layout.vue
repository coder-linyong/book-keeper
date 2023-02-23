<script lang="ts" setup>

</script>

<template>
  <div :class="`q-pa-md ${$style.layout}`">
    <q-layout container view="hHh lpR fFf">
      <q-page-container>
        <q-page :class="$style.content" class="q-pa-md">
          <slot/>
        </q-page>
      </q-page-container>
      <!--      <q-footer elevated>-->
      <!--        <q-toolbar class="glossy">-->
      <!--          <q-toolbar-title>Footer</q-toolbar-title>-->
      <!--        </q-toolbar>-->
      <!--      </q-footer>-->
    </q-layout>
  </div>
</template>

<style lang="stylus" module>
.layout
  display flex
  flex-direction column
  width 100%
  height 100%

.content
  max-width 900px
  margin-left auto
  margin-right auto
</style>