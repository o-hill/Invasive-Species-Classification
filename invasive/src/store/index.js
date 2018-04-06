import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/connect'

// Use Vuex as the global data storage for the app.
Vue.use(Vuex)

var current_image = {}

export default new Vuex.Store({

    // -------- State variables ----------
    state: {

        current_image: current_image
    },

    // -------- Mutations --------------
    mutations: {
        
        set_current_image(state, data) {
            state.current_image = data
        },

        get_current_image(state) {
            return state.current_image
        },

        update_label(state, data) {
            state.current_image['label'] = data
        }
    },


    // -------- Actions -----------------
    actions: {

        get_image(context) {

            api.get_next_image().then(function(response) {
                console.log('Response:')
                console.log(response.data)
                context.commit('set_current_image', response.data)
            })
        },

        classify_image(context) {

            console.log('Classification data:')
            console.log(context.state.current_image)

            api.post_classification(context.state.current_image).then(function(response) {
                console.log('Image succesfully classified!')
                context.commit('set_current_image', response.data)
            })
        },

        set_label(context, data) {
            context.commit('update_label', data)
        }
    }
})
