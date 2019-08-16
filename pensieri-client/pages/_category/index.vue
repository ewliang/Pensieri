<template>
  <div>
    <div v-if = "$apollo.loading">One moment please while we are loading the posts in this category...</div>
    <PostCardComponent v-else v-for = "(post, index) in posts"
      v-bind:key = "index"
      v-bind:postTitle = "post.title"
      v-bind:postExcerpt = "post.body"
      v-bind:postCategory = "category"
      v-bind:postURL = "post.permalink">
    </PostCardComponent>
    <button v-on:click = this.getPosts>Get Posts</button>
  </div>
</template>

<script>
import postsByCategory from '~/apollo/queries/public/postsByCategory'
import PostCardComponent from '~/components/PostCardComponent.vue'

export default {
  components: {
    PostCardComponent
  },
  data ({params}) {
    return {
      category: this.$route.params.category
    }
  },
  apollo: {
    posts: {
      query: postsByCategory,
      variables() {
        return {
          category: this.$route.params.category
        }
      }
    }
  },
  methods: {
    async getPosts() {
      this.$store.dispatch('getPosts', this.$route.params.category)
    }
  }
}
</script>

<style scoped>

</style>
