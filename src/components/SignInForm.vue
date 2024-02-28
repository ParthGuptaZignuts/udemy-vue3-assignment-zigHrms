<script setup lang="ts">
import { useModal, } from "../composables/modal";
import { useUsers,} from "../stores/users";
import { NewUser } from "../users";
import userForm from "./userForm.vue";
import { ref } from "vue";

const usersStore= useUsers();
const modal = useModal();
const error = ref<string>("");

const handleSignin = async (newUser: NewUser): Promise<void> => {
  const body = JSON.stringify(newUser);
  const res = await window.fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if ([401, 404].includes(res.status)) {
    error.value = "Username or password is incorrect.";
  } else {
    await usersStore.authenticate();
    modal.hideModal();
  }
}
</script>


<template>
  <userForm @submit="handleSignin" :error="error" />
</template>
