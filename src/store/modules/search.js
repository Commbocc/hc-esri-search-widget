export default {
  state: {
    result: null,
  },
  actions: {
    saveSearchResult ({ commit }, result) {
      return new Promise((resolve, reject) => {
        if (result.error) {
          reject(result.error.message)
        } else if (result.hasFeature()) {
          commit('setSearchResult', result)
          resolve(result)
        } else {
          reject('No search results were found')
        }
      })
    },
    resetSearch ({ commit }, e) {
      commit('setSearchResult', null)
    }
  },
  mutations: {
    setSearchResult (state, data) {
      state.result = data
    }
  }
}
