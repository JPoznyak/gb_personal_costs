import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categories: []
    },
    mutations: {
        setPaymentList(state, payload) {
            state.paymentsList = payload
        },
        addDataToPaymentList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoriesList(state, payload) {
            state.categories = payload
        },
        addCategoryToList(state, payload) {
            state.categories.push(payload)
        }
    },
    getters: {
        //получаем список paymentsList
        getPaymentsList: state => state.paymentsList,

        //получаем суммарную стоимость всех платежей
        getPaymentsListTotalAmount: state =>{
            return state.paymentsList.reduce((res, cur)=> res + cur.amount, 0)
        },
        getCategoriesList: state=>state.categories
    },
    actions: {
        fetchData({commit}){
            if(this.state.paymentsList.length) return
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    const items = []
                    for(let i = 1; i < 25; i++){
                        items.push({
                            date: "27.09.2021",
                            category: "Health",
                            amount: i + 1000,
                            id: i
                        })
                    }
                    resolve(items)
                },1000)
            }).then(res=> commit('setPaymentList', res))
        },
        fetchCategoryList({commit}){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Family'])
                },1000)
            }).then(res=> commit('setCategoriesList', res))
        }
    },
})