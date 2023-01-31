import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList : [],
    commentList : [],
    cartItems: [],
  },
  mutations: {
    SetProductList(state,productList){
      state.productList = productList
    },
    SetCommentList(state,commentList){
      state.commentList = commentList
    },
    AddCartItem(state,cartItem){
      state.cartItems.push(cartItem)
    },
    RemoveCartItem(state,itemID){
      state.cartItems = state.cartItems.filter(el => el.itemID != itemID)
    }
  },
  actions: {
    FetchData({commit}){
      axios.get('https://dummyjson.com/products')
      .then((res)=>{
        commit('SetProductList',res.data.products)
      })

      axios.get('https://dummyjson.com/comments')
      .then((res)=>{
        commit('SetCommentList',res.data.comments)
      })
    },
    AddCartItem({state,commit},payload){
      let itemID = state.cartItems.length + 1
      let cartItem = {
        'itemID': itemID,
        'quantity': payload.quantity,
        'product': payload.product
      }
      commit('AddCartItem',cartItem)
    },
    RemoveCartItem({commit},itemID){
      commit('RemoveCartItem',itemID)
    }
  },
  getters: {
    productCategories(state){
      let ret = []
      state.productList.forEach((el) => {
        if(!ret.includes(el.category))
          ret.push(el.category)
      });
      return ret
    }
  },
})
