<template>
  <header>
    <nav>
      <ul class="mainNavbar">
        <li>
          <ul class="listRow">
            <li>
              <button @click="changeCategoriAfterWhatCustomerHasBeenChossen(0)" class="chosseCustomerButton">Mænd</button>
            </li>
            <li>
              <button @click="changeCategoriAfterWhatCustomerHasBeenChossen(1)" class="chosseCustomerButton">Kvinder</button>
            </li>
            <li>
              <button @click="changeCategoriAfterWhatCustomerHasBeenChossen(2)" class="chosseCustomerButton">Børn</button>
            </li>
          </ul>
        </li>
        <li>
          <h1>BESTSELLER</h1>
        </li>
        <li>
          <ul class="listRow">
            <li class="seachBox">
              <input type="text"/>
              <button class="iconButton">
                <ion-icon name="search-outline"></ion-icon>
              </button>
            </li>
            <li>
              <button class="iconButton">
                <ion-icon name="person-outline"></ion-icon>
              </button>
            </li>
            <li>
              <button class="iconButton">
                <ion-icon name="bag-outline"></ion-icon>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <nav>
      <ul class="categoriNavbar">
        <li v-for="categori in customerCategori">
          <RouterLink :to="'/' + chosenCustomer + '/' + categori.name.dk">{{ categori.name.dk }}</RouterLink>
        </li>
      </ul>
    </nav>

    <RouterView />
  </main>
</template>

<script setup>
  import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
  import { onMounted, ref, watch } from 'vue';
  import json from './assets/data.json'

  const customerCategori = ref(json.categories.categories[0].categories[0].categories)
  const route = useRoute()
  const changeRoute = useRouter()
  const chosenCustomer = ref('man')

  watch(
    () => route.params.id,
    (newId, oldId) => {
    }
  )

  function changeCategoriAfterWhatCustomerHasBeenChossen(number){
    if(number != 2){
      chosenCustomer.value = json.categories.categories[0].categories[number].name.en
      customerCategori.value = json.categories.categories[0].categories[number].categories
      changeRoute.push("/" + chosenCustomer.value)
    } else {
      chosenCustomer.value = json.categories.categories[1].name.en
      changeRoute.push("/" + chosenCustomer.value)
    }
    
  }

  // It will run when the site as been loaded 
  onMounted(() => {
    if(!route.params.id){
      changeRoute.push('/Men')
    }
  })
</script>

<style>
/****************************************/
/*             Header navbar            */
/****************************************/
.mainNavbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  margin: 0;
  padding: 0 10px;
}

.listRow{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

}

li a, li h1 {
  display: inline-block;
  color: #000;
  text-align: center;
  text-decoration: none;
}

li h1{
  padding-left: 149px
}

/****************************************/
/*             Categori navbar          */
/****************************************/
.categoriNavbar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: 1px #000 solid;
  border-left: none;
  border-right: none;
}

/****************************************/
/*             Search box               */
/****************************************/

.seachBox{
  display: flex;
  align-items: center;
  flex-direction: row;

  border: 1px #000 solid;
  border-radius: 15px;
}

.seachBox input{
  border: none;
  height: 26px;
  padding: 10px;
  border-radius:  15px 0 0 15px;
}

.seachBox input:focus-visible{
  outline: none;
}


/****************************************/
/*             Button styling           */
/****************************************/
.iconButton{
  background-color: inherit;
  border: none;
  font-size: 20px;
}

.chosseCustomerButton{
  background-color: inherit;
  border: none;
  font-size: 15px;
}
</style>