<template>
  <div>
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
