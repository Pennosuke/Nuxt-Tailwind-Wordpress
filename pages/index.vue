<template>
  <div class="flex my-10">
    <main class="flex flex-col mx-auto">
      <div class="mx-auto w-48 bg-red-500 text-white font-bold py-2 px-4 rounded-full">
        <h1 class="text-center text-5xl">
          Posts
        </h1>
      </div>
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div v-for="post in posts" :key="post.id" class="post">
            <h3>
              <a :href="`blog/${post.slug}`">{{ post.title.rendered }}</a>
            </h3>
            <div v-html="post.excerpt.rendered"></div>
            <a :href="`blog/${post.slug}`" class="readmore">Read more ⟶</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts
    }
  },
  created() {
    this.$store.dispatch('getPosts')
  }
}
</script>

<style>
.post {
  @apply m-5 max-w-sm rounded overflow-hidden shadow-lg;
}
</style>
