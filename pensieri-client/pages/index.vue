<template>
  <section class="container">
    <div>
      <h1 class="title">
        pensieri-client
      </h1>
      <h2 class="subtitle">
        A Nuxt.js client for Pensieri. Pensieri is a full stack Node.js based blogging platform.
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
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
    let posts = await axios.get('/posts')
    return {
      posts: posts.data
    }
  }
}
</script>

<style>
</style>
