<template>
  <div>
    <form @submit.prevent = "createPost()">
      <label for = "postTitle">Title</label>
      <input type = "text" v-model = "Post.title" placeholder = "Post Title" id = "postTitle">
      <br>
      <label for = "isFeatured">Is Featured?</label>
      <select v-model = "Post.isFeatured" id = "isFeatured">
        <option value = "false">False</option>
        <option value = "true">True</option>
      </select>
      <label for = "isPublished">Is Published?</label>
      <select v-model = "Post.isPublished" id = "isPublished">
        <option value = "false">False</option>
        <option value = "true">True</option>
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
  async asyncData ({ params }) {
    let post = await axios.get('http://localhost:4000/posts/' + params.postID)
    return {
      post: post.data
    }
  },
  data () {
    return {
      Post: {
        title: '',
        body: '',
        isPublished: false,
        isFeatured: false
      }
    }
  },
  methods: {
    createPost () {
      axios.post('http://localhost:4000/posts', this.Post)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.Post.title = this.post.title
    this.Post.body = this.post.body
    this.Post.isPublished = this.post.isPublished
    this.Post.isFeatured = this.post.isFeatured
  }
}
</script>

<style scoped>

</style>
