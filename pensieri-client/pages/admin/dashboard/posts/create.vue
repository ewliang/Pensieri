<template>
  <div>
    <form @submit.prevent = "createPost()">
      <label for = "postTitle">Title</label>
      <input type = "text" v-model = "Post.title" placeholder = "Post Title" id = "postTitle">
      <br>
      <label for = "isFeatured">Is Featured?</label>
      <select v-model = "Post.isFeatured" id = "isFeatured">
        <option value = "false" selected>False</option>
        <option value = "true">True</option>
      </select>
      <label for = "isPublished">Is Published?</label>
      <select v-model = "Post.isPublished" id = "isPublished">
        <option value = "false" selected>False</option>
        <option value = "true">True</option>
      </select>
      <br>
      <select v-model = "Post.category" required>
        <option v-for = "(category, index) in categories" v-bind:key = "index" :value = "category._id">{{ category.title }}</option>
      </select>
      <br>
      <textarea v-model = "Post.body" placeholder = "Your post content..."></textarea>
      <br>
      <input type = "submit" value = "Create">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    let categories = await axios.get('http://localhost:4000/categories')
    return {
      categories: categories.data
    }
  },
  data () {
    return {
      Post: {
        title: '',
        body: '',
        isPublished: false,
        isFeatured: false,
        category: ''
      }
    }
  },
  methods: {
    async createPost () {
      axios.post('http://localhost:4000/posts', this.Post)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
