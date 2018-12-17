<template>
  <div>
    TODO: Get posts by category filter.
    <PostCardComponent v-for = "(post, index) in postsByCategory"
      v-bind:key = "index"
      v-bind:postTitle = "post.title"
      v-bind:postExcerpt = "post.body"
      v-bind:postURL = "post.permalink">
    </PostCardComponent>
  </div>
</template>

<script>
import postsByCategory from '~/apollo/queries/public/postsByCategory'
import PostCardComponent from '~/components/PostCardComponent.vue'

export default {
  components: {
    PostCardComponent
  },
  apollo: {
    postsByCategory: {
      query: postsByCategory,
      variables: {
        category: 'miscellaneous'
      }
    }
  }
}
</script>

<style scoped>

</style>
