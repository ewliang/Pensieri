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
          <td><input type = "checkbox" v-bind:value = "post._id"></td>
          <td><nuxt-link :to = "'/admin/dashboard/posts/edit/' + post._id">{{ post.title }}</nuxt-link></td>
          <td><button @click.prevent = "deletePost(post._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    let posts = await axios.get('http://localhost:4000/posts')
    return {
      posts: posts.data
    }
  },
  methods: {
    deletePost (postID) {
      axios.delete('http://localhost:4000/posts/' + postID)
    }
  }
}
</script>

<style scoped>

</style>
