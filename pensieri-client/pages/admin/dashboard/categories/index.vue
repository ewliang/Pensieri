<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    let categories = await axios.get('/categories')
    return {
      categories: categories.data
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
