<template>
  <div>
    <form @submit.prevent = "createCategory()">
      <label for = "categoryTitle">Title</label>
      <br>
      <input type = "text" v-model = "Category.title" id = "categoryTitle" placeholder = "Category">
      <br>
      <label for = "isPublished">Is Published?</label>
      <select v-model = "Category.isPublished" id = "isPublished">
        <option value = "false">False</option>
        <option value = "true">True</option>
      </select>
      <br>
      <textarea v-model = "Category.description" placeholder = "Your category description..."></textarea>
      <br>
      <input type = "submit" value = "Create">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      Category: {
        title: '',
        description: '',
        isPublished: false
      }
    }
  },
  methods: {
    async createCategory () {
      axios.post('http://localhost:4000/categories', this.Category)
    }
  }
}
</script>

<style scoped>

</style>
