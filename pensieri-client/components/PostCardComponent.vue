<template>
  <article>
    <img src = "" :alt = postTitle>
    <h2>{{ postTitle }}</h2>
    <p>
      {{ postExcerpt }}
    </p>
    <a :href = "'/' + postCategory + '/' + postURL">Read More</a>
  </article>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostCardComponent',
  props: [
    'featuredImage', 'postTitle', 'postExcerpt', 'postURL', 'postCategory'
  ]
}
</script>

<style scoped>

</style>
