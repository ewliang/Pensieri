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
        <tr v-for = "(category, index) in categories" v-bind:key = "index">
          <td><input type = "checkbox" v-bind:value = "category._id"></td>
          <td><nuxt-link :to = "'/admin/dashboard/categories/edit/' + category.permalink">{{ category.title }}</nuxt-link></td>
          <td><button @click.prevent = "deleteCategory(category._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
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
  methods: {
    deleteCategory (categoryID) {
      axios.delete('http://localhost:4000/categories/' + categoryID)
    }
  }
}
</script>

<style scoped>

</style>
