<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Title</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "(post, index) in posts" v-bind:key = "index">
          <td><input type = "checkbox" v-bind:value = "post.id"></td>
          <td><nuxt-link :to = "'/admin/dashboard/posts/edit/' + post.id">{{ post.title }}</nuxt-link></td>
          <td><button @click.prevent = "deletePost(post.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import posts from '~/apollo/queries/admin/posts'

export default {
  apollo: {
    posts: {
      query: posts
    }
  },
  methods: {
    deletePost (postID) {
      //axios.delete('http://localhost:4000/posts/' + postID)
    }
  }
}
</script>

<style scoped>

</style>
