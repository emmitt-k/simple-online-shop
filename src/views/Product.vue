<template>
    <v-main v-if="product != null" class="grey lighten-3">
        <!--Main panel-->
        <v-container>
            <v-sheet class="mt-3" rounded="lg">
                <v-row>
                    <v-col class="pa-4" cols="4">
                        <v-carousel>
                            <v-carousel-item
                            v-for="(image,i) in product.images"
                            :key="i"
                            :src="image"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            ></v-carousel-item>
                        </v-carousel>
                    </v-col>
                    <v-col class="pa-4" cols="5">
                        <v-row>
                            <v-col>
                                <h1>{{ product.title }}</h1>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col>
                                {{ product.description }}
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="3">
                                <v-rating
                                :value="product.rating"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                            </v-col>
                            <v-col>
                                <label>{{ product.rating }}</label>
                            </v-col>
                            <v-col cols="2" class="d-flex justify-end">
                                <v-btn
                                    text
                                    icon
                                >
                                    <v-icon>mdi-share-variant</v-icon>
                                </v-btn>
                                <v-btn
                                    text
                                    icon
                                >
                                    <v-icon>mdi-heart-outline</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col>
                                <h4>Brand : {{ product.brand }}</h4>
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <v-icon class="mr-2" color="success">mdi-truck-fast-outline</v-icon>
                                <label>Free shipping</label>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-2"></v-divider>
                        <v-row>
                            <v-col>
                                <h2 class="orange--text">${{ getDiscountPrice(product.price,product.discountPercentage) }}</h2>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="2" style="max-width:10%;">
                                <strike class="grey--text">${{ product.price }}</strike>
                            </v-col>
                            <v-col>
                                <label>-{{ product.discountPercentage }}%</label>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-2"></v-divider>
                        <v-row class="mt-2">
                            <v-col cols="3" style="max-width:20%;">
                                <h4>Quantity :</h4>
                            </v-col>
                            <v-col>
                                <v-btn @click="decrease()" depressed><v-icon>mdi-minus</v-icon></v-btn>
                                <label class="ml-4 mr-4">{{ quantity }}</label>
                                <v-btn @click="increase()" depressed><v-icon>mdi-plus</v-icon></v-btn>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-4"></v-divider>
                        <v-row>
                            <v-col>
                                <v-btn :disabled="quantity <= 0" depressed color="amber" style="width:100%;">Buy Now</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn :disabled="quantity <= 0" @click="AddCartItem({quantity,product})" depressed color="orange" style="width:100%;">Add to cart</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="grey lighten-5" cols="3">
                        <v-row>
                            <v-col class="mt-2"><label class="font-weight-bold">Delivery Options</label></v-col>
                            <v-col class="d-flex justify-end">
                                <v-btn
                                    text
                                    icon
                                >
                                    <v-icon>mdi-information-outline</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>mdi-map-marker-outline</v-icon>
                            </v-col>
                            <v-col class="ml-2 pr-0" cols="6">
                                <p>1600 Pennsylvania Avenue NW in Washington, D.C.,</p>
                            </v-col>
                            <v-col cols="1">
                                <v-btn text color="primary">Change</v-btn>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-4"></v-divider>
                        <v-row>
                            <v-col cols="2">
                                <v-icon>mdi-truck-outline</v-icon>
                            </v-col>
                            <v-col class="pr-0" cols="7">
                                <v-row>
                                    <label>Standard Delivery</label>
                                </v-row>
                                <v-row>
                                    <label class="grey--text">Get by 11-12 Jan</label>
                                </v-row>
                            </v-col>
                            <v-col cols="1">
                                <label class="font-weight-bold">Free</label>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>mdi-cash-multiple</v-icon>
                            </v-col>
                            <v-col class="ml-3">
                                <label>Cash on Delivery Available</label>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-2 mb-4"></v-divider>
                        <v-row>
                            <v-col cols="8" class="mt-2"><label class="font-weight-bold">Return & Warranty</label></v-col>
                            <v-col class="d-flex justify-end">
                                <v-btn
                                    text
                                    icon
                                >
                                    <v-icon>mdi-information-outline</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>mdi-heart-circle-outline</v-icon>
                            </v-col>
                            <v-col class="ml-3">
                                <label>Change of Mind</label>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>mdi-numeric-7-circle-outline</v-icon>
                            </v-col>
                            <v-col class="ml-3">
                                <label>7 days return to seller</label>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1">
                                <v-icon>mdi-shield-outline</v-icon>
                            </v-col>
                            <v-col class="ml-3">
                                <label>1 Year Warranty by Seller</label>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>
        <!--Reviews & Ratings-->
        <v-container class="mt-3" >
            <v-sheet rounded="lg" class="pa-4">
                <v-row class="pa-4 grey lighten-4">
                    <h4>Reviews & Ratings:</h4>
                </v-row>
                <v-row class="pa-4">
                    <v-col cols="3">
                        <v-row >
                            <h1>{{product.rating}}/5</h1>
                        </v-row>
                        <v-row>
                            <v-rating
                                :value="product.rating"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="40"
                                ></v-rating>
                        </v-row>
                        <v-row class="mt-4">
                            <label class="grey--text">48 Ratings</label>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col cols="2" class="pt-0 pb-0">
                                <v-rating
                                :value="5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                            </v-col>
                            <v-col cols="4" >
                                <v-progress-linear color="amber" value="100"></v-progress-linear>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="pt-0 pb-0">
                                <v-rating
                                :value="4"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                            </v-col>
                            <v-col cols="4" >
                                <v-progress-linear color="amber" value="50"></v-progress-linear>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="pt-0 pb-0">
                                <v-rating
                                :value="3"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                            </v-col>
                            <v-col cols="4"">
                                <v-progress-linear color="amber" value="0"></v-progress-linear>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="pt-0 pb-0">
                                <v-rating
                                :value="2"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                            </v-col>
                            <v-col cols="4">
                                <v-progress-linear color="amber" value="0"></v-progress-linear>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="pt-0 pb-0">
                                <v-rating
                                :value="1"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                            </v-col>
                            <v-col cols="4">
                                <v-progress-linear color="amber" value="0"></v-progress-linear>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="pa-4 grey lighten-5">
                    <h4>Product Reviews:</h4>
                </v-row>
                <v-row v-for="(c,idx) in commentList" :key="idx">
                    <v-col>
                        <v-row no-gutters>
                            <v-rating
                                :value="5"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="20"
                                ></v-rating>
                        </v-row>
                        <v-row class="mt-2" no-gutters>
                            <v-col cols="2" style="max-width:10%;">
                                <label>by {{ c.user.username }}</label>
                            </v-col>
                            <v-col>
                                <v-icon color="success">mdi-shield-check</v-icon>
                                <label class="green--text" style="font-size:10px;">Verified Purchase</label>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2" no-gutters>
                            <v-col>
                                <label>{{ c.body }}</label>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                    </v-col>                  
                </v-row>
            </v-sheet>
        </v-container>
    </v-main>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
    data: () => ({
        model: 0,
        colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
        ],
        product: null,
        quantity: 1,
    }),
    computed:{
      ...mapState(['productList','commentList']),
    },
    methods:{
        ...mapActions(['AddCartItem']),
        getDiscountPrice(fullPrice,percent){
            let discountPrice = fullPrice - fullPrice * (percent/100)
            return discountPrice.toFixed(2)
        },
        increase(){
            this.quantity++
        },
        decrease(){
            this.quantity--
            if(this.quantity<1)
                this.quantity = 1
        },

    },
    created(){
        this.product = this.productList.filter(el => el.id == this.$route.query.id)[0]
    },
    watch: { 
        $route (to, from){
            this.product = this.productList.filter(el => el.id == to.query.id)[0]
        }
    }
}
</script>