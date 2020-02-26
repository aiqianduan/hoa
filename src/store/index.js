import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ids: []
    },
    mutations: {
        pushIds (state, id) {
            let data = JSON.parse(sessionStorage.getItem('ids'))
            if (!data) data = []
            if (id && !data.includes(id)) data.unshift(id)
            state.ids = data
            sessionStorage.setItem('ids', JSON.stringify(data))
        }
    },
    actions: {
    },
    modules: {
    }
})
