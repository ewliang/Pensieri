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
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let post = await axios.get('/posts/${params.post}')
    return {
      post: post.data
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
