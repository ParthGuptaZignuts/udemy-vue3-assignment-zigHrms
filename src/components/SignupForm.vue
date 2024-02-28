<script setup lang="ts">
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import { NewUser } from "../users";
import userForm from "./userForm.vue";

const usersStore = useUsers();
const modal = useModal();

const handleSignup = async (newUser: NewUser): Promise<void> => {
  if (newUser) {
    await usersStore.createUser(newUser);
    modal.hideModal();
  }
}
</script>


<template>
  <userForm @submit="handleSignup" />
</template>
