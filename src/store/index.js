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
            if (id instanceof Array && data) {
                data = data.concat(id)
            } else if (id && !data.includes(id)) {
                data.unshift(Number(id))
            }
            data = Array.from(new Set(data))
            state.ids = data
            sessionStorage.setItem('ids', JSON.stringify(data))
        }
    },
    actions: {
    },
    modules: {
    }
})
