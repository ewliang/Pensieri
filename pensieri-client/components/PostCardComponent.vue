<template>
  <article class = "post-card">
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
.post-card {
  max-width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 5px 5px #eee;
}
.post-card h2 {
  padding: 10px 10px 0px 10px;
}
.post-card p {
  padding: 0px 10px 10px 10px;
}
</style>
