<template>
    <v-main class="grey lighten-3">
        <v-container style="max-width:70vw">
            <v-sheet class="mt-3" rounded="lg">
                <v-row class="pa-2">
                    <v-col cols="8">
                        <v-row>
                            <v-col>
                                <h3 class="mb-2 ml-1">My Shopping Cart</h3>
                                <v-row class="ml-1 mt-2 mb-2 grey lighten-4" v-for="(item,idx) in cartItems" :key="idx">
                                    <v-col cols="3">
                                        <v-img
                                        :src="item.product.thumbnail"
                                        ></v-img>
                                    </v-col>
                                    <v-col cols="4">
                                        <table>
                                            <tr><td><h4>{{ item.product.title }}</h4></td></tr>
                                            <tr><td><label>{{ item.product.brand }}</label></td></tr>
                                            <tr><td><label style="color:#956504; font-size: small;">Only {{ item.product.stock }} items in stock</label></td></tr>
                                            <tr><td>
                                                <v-btn
                                                    text
                                                    icon
                                                >
                                                    <v-icon>mdi-heart-outline</v-icon>
                                                </v-btn>
                                                <label style="font-size: small;">Move to Wishlist</label>
                                            </td></tr>
                                        </table>
                                    </v-col>
                                    <v-col cols="3">
                                        <table>
                                            <tr><td>
                                                <h4 style="color:green; display: inline;">${{ getDiscountPrice(item) }}</h4>
                                                <label class="ml-2">(per unit)</label>
                                            </td></tr>
                                            <tr><td><strike>${{ item.product.price }}</strike></td></tr>
                                            <tr><td><label>{{item.product.discountPercentage}}% OFF</label></td></tr>
                                            <tr><td><label>Total (x{{ item.quantity }}): ${{ getDiscountPrice(item) * item.quantity }}</label></td></tr>
                                        </table>
                                    </v-col>
                                    <v-col class="d-flex justify-end">
                                        <v-btn
                                            text
                                            icon
                                            @click="RemoveCartItem(item.itemID)"
                                        >
                                            <v-icon>mdi-window-close</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-row style="position:relative;top:70%" v-if="cartItems.length == 0">
                                    <v-col class="d-flex justify-center">
                                        <h2 style="opacity:0.5">No Item in cart :(</h2>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4">
                        <h3>Order Summary</h3>
                        <v-divider></v-divider>
                        <v-row class="mt-2 mr-2">
                            <v-col>
                                <label>Subtotal:</label>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <label>${{ getSubTotal() }}</label>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2 mr-2">
                            <v-col>
                                <label>Shipping fee:</label>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <label>$14.95</label>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-4"></v-divider>
                        <v-row class="mt-2 mr-2">
                            <v-col>
                                <label>Total (7 % GST incl):</label>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <label style="font-weight:bold">${{ getFinalTotal(subTotal + 14.95) }}</label>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2 d-flex justify-center">
                            <v-col>
                                <v-btn :disabled="cartItems.length <= 0" class="orange darken-2" depressed style="width:100%;color: white;">PROCEED TO CHECKOUT</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>
    </v-main>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
    data(){
        return{
            subTotal: 0
        }
    },
    computed:{
        ...mapState(['cartItems'])
    },
    methods:{
        ...mapActions(['RemoveCartItem']),
        getDiscountPrice(item){
            let fullPrice = item.product.price
            let percent = item.product.discountPercentage
            let discountPrice = fullPrice - fullPrice * (percent/100)
            return discountPrice.toFixed(2)
        },
        getSubTotal(){
            this.cartItems.forEach(async (el) => {
                this.subTotal += this.getDiscountPrice(el) * el.quantity
            });
            return this.subTotal.toFixed(2)
        },
        getFinalTotal(val){
            return val.toFixed(2)
        }
    }
}
</script>