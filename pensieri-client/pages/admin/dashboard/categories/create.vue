<template>
  <div>
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
  }
}
</script>

<style scoped>

</style>
