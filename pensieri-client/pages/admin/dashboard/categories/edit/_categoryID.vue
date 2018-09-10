<template>
  <div>
    <form @submit.prevent = "editCategory()">
      <label for = "categoryTitle">Title</label>
      <br>
      <input type = "text" v-model = "Category.title" id = "categoryTitle" placeholder = "Category">
      <br>
      <label for = "isPublished">Is Published?</label>
      <select v-model = "Category.isPublished" id = "isPublished" required>
        <option value = "false">False</option>
        <option value = "true">True</option>
      </select>
      <br>
      <textarea v-model = "Category.description" placeholder = "Your category description..."></textarea>
      <br>
      <input type = "submit" value = "Edit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let category = await axios.get('http://localhost:4000/categories/' + params.categoryID)
    return {
      category: category.data
    }
  },
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
    editCategory () {
      axios.put('http://localhost:4000/categories', this.Category)
    }
  },
  created () {
    this.Category.title = this.category.title
    this.Category.description = this.category.description
    this.Category.isPublished = this.category.isPublished
  }
}
</script>

<style scoped>

</style>
