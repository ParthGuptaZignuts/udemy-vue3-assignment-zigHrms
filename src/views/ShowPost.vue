<script lang="ts" setup>
import { computed, Ref } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { usePosts } from "../stores/posts";
import { useUsers} from "../stores/users";
import { Post } from "../posts";

const route: RouteLocationNormalizedLoaded = useRoute();
const postsStore = usePosts();
const usersStore = useUsers();
const id: string = route.params.id as string;
const post: Post | undefined = postsStore.all.get(id);

if (!post) {
  throw Error(`Post with id ${id} was not found`);
}

const canEdit: Ref<boolean> = computed(() => {
  if (!usersStore.currentUserId) {
    return false;
  }

  if (usersStore.currentUserId !== post.authorId) {
    return false;
  }

  return true;
});
</script>


<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
        v-if="canEdit"
        :to="`/posts/${post.id}/edit`"
        class="is-link button is-rounded"
        >Edit Post</RouterLink
      >
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column"></div>
  </div>
</template>
