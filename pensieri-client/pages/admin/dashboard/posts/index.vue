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
          <td>{{ post._id }}</td>
          <td>{{ post.title }}</td>
          <td></td>
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
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
