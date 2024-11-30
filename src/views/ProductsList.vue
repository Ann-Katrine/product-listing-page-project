<template>
  <main>
    <div class="productListMainBox">
      <div class="productListSidebareBox">
        <ul class="sidenavbar">
          <li>
            <h2>Filter</h2>
          </li>
          <li>
            <div class="sidebarPriceText">
              <p class="sidebarText">Price</p>
              <label class="productNameSize">100 kr. - 1000 kr.</label>
            </div>
            <input type="range" min="100.00" max="1000.00" id="priceRange" @input="changePrice">
            <label> {{ setPrice }}</label>
          </li>
          <li>
            <label class="sidebarText">color</label>
            <div v-for="color in getColors" :key="color.id">
              <div>
                <input type="checkbox" id="">
                <label> {{ color.color  }} </label>
              </div>
            </div>
          </li>
          <li>
            <label class="sidebarText">Size</label>
            <div>
              <div v-for="size in rbnArray" :key="size.id">
                <input type="checkbox" :id="size.id" :checked="size.checked" @click="checkAndChangeSizeRadioButton(size.id)">
                <label>{{ size.name }}</label>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="productListProductItemsBox">
        <h2 class="categoriHeadline"> {{  categoriHeadline }}</h2>
        <div v-if="getTheProduct.length == 0">
          <p>Der blev ikke fundet nogen producter</p>
        </div>
        <div v-else class="productBox">
          <div class="productStyling" v-for="product in getTheProduct" :key="product.id">
            <img :src="product.images[0]" height="100%" width="100%"/>
            <div class="productTextInfoBox">
              <div>
                <p v-if="product.name.dk == ''" class="productNameSize">{{ product.name.en}}</p>
                <p v-else-if=" product.name.dk != undefined" class="productNameSize">{{ product.name.dk }}</p>
                <p v-else class="productNameSize">{{ product.name.en}}</p>
                <p >{{ product.price }} kr.</p>
              </div>
              <div>
                <button class="iconButton">
                  <ion-icon name="bag-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { watch, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductsStore } from '@/stores/Products';
  import { storeToRefs } from 'pinia'

  const route = useRoute()
  const produstStore = useProductsStore()
  const { getTheProduct, getColors } = storeToRefs(produstStore)
  const setPrice = ref(0)
  const categoriHeadline = ref('Nyheder')
  const rbnArray = ref([
    {id: 'size-sx', name: 'SX', checked: false}, 
    {id: 'size-s', name: 'S', checked: false}, 
    {id: 'size-m', name: 'M', checked: false}, 
    {id: 'size-l', name: 'L', checked: false}, 
    {id: 'size-xl', name: 'XL', checked: false}
  ])

  watch(
    () => route.params.id,
    (newId, oldId) => {
      if( newId != oldId ){
        let routePath = []
        routePath = route.params.id.split("/")
        categoriHeadline.value = routePath[1]
        produstStore.changeProduct(routePath[0], routePath[1])
      }
    }
  )

  function checkAndChangeSizeRadioButton(id){
    for (let i = 0; i < rbnArray.value.length; i++) {
      if(rbnArray.value[i].id == id){
        rbnArray.value[i].checked = true
      } else {
        rbnArray.value[i].checked = false
      }
    }
  }

  function changePrice(){
    setPrice.value = document.getElementById('priceRange').value
  }

</script>

<style>
/****************************************/
/*                  Boxes               */
/****************************************/
.productListMainBox{
  display: flex;
}

.productListSidebareBox{
  flex: 20%;
  margin: 10px 0 0 10px;
}

.productListProductItemsBox{
  flex: 80%;
  padding: 0 10px;
  width: auto;
}

.sidenavbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

}

/****************************************/
/*            SideBar - price           */
/****************************************/
.sidebarPriceText{
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 5px;
}

.sidebarText{
  font-size: 17px
}

/****************************************/
/*            Product styling           */
/****************************************/
.productBox{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5%;
}

.productStyling {
  height: 20%;
  width: 20%;

  padding-bottom: 15px;
}

.productTextInfoBox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.productNameSize{
  font-size: 10px;
}

/****************************************/
.categoriHeadline{
  margin: 10px 0;
}
</style>
