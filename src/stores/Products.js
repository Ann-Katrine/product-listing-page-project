import { defineStore } from 'pinia'
import json from '@/assets/data.json'

export const useProductsStore = defineStore('product', {
    state: () => ({
        products: json.products,
        categori: json.categories,
        finallyProduct: [],
        colors: []
    }),
    getters: {
        getTheProduct(){
            return this.finallyProduct
        }, 
        getColors(){
            return this.colors
        }
    },
    actions: {
        changeProduct(customer, categori){
            let theCategori = ''
            if(customer != 'kids'){
                // Find the categori
                let customerCategoriId = this.categori.categories[0].categories
                for (let i = 0; i < customerCategoriId.length; i++) {
                    for (let j = 0; j < customerCategoriId[i].categories.length; j++) {
                        if(customerCategoriId[i].categories[j].name.dk == categori && customerCategoriId[i].name.en == customer){
                            theCategori = customerCategoriId[i].categories[j].id
                        }
                    }
                }

            }

            this.finallyProduct = []
            // Find the Products
            for (let i = 0; i < this.products.length; i++) {
                for (let j = 0; j < this.products[i].categories.length; j++) {
                    if( customer != 'kids'){
                        if(this.products[i].categories[j] == theCategori){
                            this.finallyProduct.push(this.products[i])
                        }   
                    } else {
                        if(this.products[i].categories[j] == categori){
                            this.finallyProduct.push(this.products[i])
                        }   
                    }                     
                }
            }
        },
        setColor(customer){
            let allColor = []
            this.colors = []
            for (let i = 0; i < this.products.length; i++) { // Runs through the products 
                for (let j = 0; j < this.products[i].categories.length; j++) { // Runs through the products categories
                    if( this.products[i].categories[j] == customer){
                        if(allColor.includes(this.products[i].color) == false){
                            if(this.products[i].color != ''){
                                allColor.push(this.products[i].color)
                                this.colors.push(this.products[i])
                            }
                        }
                    }                    
                }
            }
        }
    }
})