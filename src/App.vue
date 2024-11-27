<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <ul class="mainNavbar">
        <li>
          <ul class="listRow">
            <li>
              <RouterLink to="/">mænd</RouterLink>
            </li>
            <li>
              <RouterLink to="/">kvinder</RouterLink>
            </li>
            <li>
              <RouterLink to="/">børn</RouterLink>
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
    <RouterView />
  </main>
</template>

<style>
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

.iconButton{
  background-color: inherit;
  border: none;
  font-size: 20px;
}

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
</style>
