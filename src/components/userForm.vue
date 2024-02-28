<script setup lang="ts">
import { computed, ref } from "vue";
import FormInput from "./FormInput.vue";
import { NewUser } from "../users";
import { validate, length, required } from "../validation";

const props = defineProps<{
  error?: string;
}>();
const emit = defineEmits<{
  (event: "submit", payload: NewUser): void;
}>();

const username = ref<string>("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 15 })]);
});

const password = ref<string>("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 20 })]);
});

const isInvalid = computed<boolean>(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const handleSubmit = async (): Promise<void> => {
  if (isInvalid.value) {
    return;
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };
  try {
    emit("submit", newUser);
  } catch (e) {
    // Handle errors if needed
  }
}
</script>


<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput
      name="Username"
      v-model="username"
      :status="usernameStatus"
      type="text"
    />
    <FormInput
      name="Password"
      v-model="password"
      :status="passwordStatus"
      type="password"
    />
    <div v-if="error" class="is-danger help">
      {{ error }}
    </div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background-color: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
