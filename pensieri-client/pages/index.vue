<template>
  <section class="container">
    <div>
      <h1 class="title">
        Pensieri
      </h1>
      <p class="subtitle">
        A Nuxt.js client for Pensieri, which is a full stack Node.js blogging platform.
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import PostCardComponent from '~/components/PostCardComponent.vue'

export default {
  components: {
    PostCardComponent
  },
  async asyncData () {
    let posts = await axios.get('http://localhost:4000/posts')
    return {
      posts: posts.data
    }
  }
}
</script>

<style>
</style>
