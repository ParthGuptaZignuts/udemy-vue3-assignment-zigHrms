<script setup lang="ts">
import {TimeLinePost} from "../posts"
const props = defineProps<{
post: TimeLinePost
}>()
</script>

<template>
    <a 
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
        <a>{{ props.post.title }}</a>
        <div>{{ props.post.created.toFormat("d MMM") }}</div>
      </a>
</template>
