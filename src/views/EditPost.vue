<script lang="ts" setup>
import PostWriter from '../components/PostWriter.vue';
import { useRoute, useRouter } from 'vue-router';
import { usePosts} from '../stores/posts';
import { Post } from '../posts';

const route = useRoute();
const router = useRouter();
const postsStore = usePosts();
const id = route.params.id as string;
const post: Post | undefined = postsStore.all.get(id);

if (!post) {
  throw Error(`Post with id ${id} was not found`);
}

const handleSubmit = async (post: Post): Promise<void> => {
  if (post) {
    await postsStore.updatePost(post);
    router.push("/");
  }
}
</script>


<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>