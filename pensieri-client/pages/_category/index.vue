<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    let post = await axios.get('/categories/')
    return {
      post: post.data
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
