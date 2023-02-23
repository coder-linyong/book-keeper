<script lang="ts" setup></script>

<template>
  <div :class="$style.wraper" class="full-width text-center">
    <img alt="" src="./img/no-data.svg">
    <div>暂无数据，点击右下角
      <q-icon name="mode_edit"/>
      添加数据
    </div>
  </div>
</template>

<style lang="stylus" module>
.wraper
  font-size 16px

  img
    width 150px
    max-width 70%
    margin-bottom 20px
</style>