<template>
  <div>
    <article>
      <header>
        <h1>{{ post.title }}</h1>
      </header>
      <p>
        {{ post.body }}
      </p>
    </article>
  </div>
</template>

<script>
import post from '~/apollo/queries/public/postByPermalink'

export default {
  asyncData() {
    return {
      post: post
    }
  },
  apollo: {
    post: {
      query: post,
      variables() {
        return {
          permalink: this.$route.params.post
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
