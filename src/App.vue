<script setup lang="ts"> 
import { computed } from "vue"
import Navbar from "./components/Navbar.vue";
import {useModal} from "./composables/modal" 
import { useUsers } from "./stores/users";

const modal = useModal() ;
const usersStore = useUsers();

const modalStyle = computed(() =>{
  return{
    display: modal.show.value ? 'block' : 'none'
  }
})


usersStore.authenticate()

</script>
<template>
  <div class="modal" style="color:white;" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>
  <div class="section">
    <div class="container">  
      <Navbar/>
      <RouterView />
 
    </div>
  </div>
</template>

<!-- npx tsx src/server/index.ts -->