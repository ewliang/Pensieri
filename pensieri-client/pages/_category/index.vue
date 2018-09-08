<template>
  <div>
    <PostCardComponent v-for = "(post, index) in posts"
      v-bind:key = "index"
      v-bind:postTitle = "post.title"
      v-bind:postExcerpt = "post.excerpt"
      v-bind:postURL = "post.permalink">
    </PostCardComponent>
  </div>
</template>

<script>
import axios from 'axios'
import PostCardComponent from '~/components/PostCardComponent.vue'

export default {
  async asyncData ({ params }) {
    let posts = await axios.get('http://localhost:4000/posts/${params.category}')
    return {
      posts: posts.data
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
