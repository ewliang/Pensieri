<template>
  <article>
    <img src = "" :alt = postTitle>
    <h2>{{ postTitle }}</h2>
    <p>
      {{ postExcerpt }}
    </p>
  </article>
</template>

<script>
import axios from 'axios'

export default {
  props: [
    'featuredImage', 'postTitle', 'postExcerpt', 'postURL'
  ]
}
</script>

<style scoped>

</style>
