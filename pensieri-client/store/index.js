import Vuex from 'vuex'
import postsByCategory from '~/apollo/queries/public/postsByCategory'



const store = () => {
  return new Vuex.Store({
    actions: {
      getPosts: (store, category) => {
        
        this.$apollo.queries({
          query: postsByCategory,
          variables() {
            return {
              category: category
            }
          }
        }).then(data => {
          console.log(data)
        }).catch(error => {
          console.error(error)
        })
        
      }
    }
  })
}

export default store