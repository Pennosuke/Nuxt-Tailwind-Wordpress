<template>
  <div class="flex my-10">
    <main class="w-3/4 flex flex-col mx-auto">
      <div
        class="mx-auto w-48 bg-red-500 text-white font-bold py-2 px-4 rounded-full"
      >
        <h1 class="text-center text-5xl">
          Posts
        </h1>
      </div>
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div v-for="post in sortedPosts" :key="post.id" class="m-5 max-w-sm rounded overflow-hidden shadow-lg">
            <h3>
              <a :href="`blog/${post.slug}`">{{ post.title.rendered }}</a>
            </h3>
            <div v-html="post.excerpt.rendered"></div>
            <a :href="`blog/${post.slug}`" class="readmore">Read more ⟶</a>
          </div>
        </div>
      </div>
    </main>
    <aside class="w-1/4">
      <h2 class="bg-black text-white text-center relative">
        Categories
      </h2>
      <div>
        <ul>
          <li
            v-for="tag in tags"
            :key="tag.id">
            <button :class="[tag.id === selectedTag ? 'border border-solid border-black bg-blue-500' : 'bg-teal-300']" @click="updateTag(tag)">
              <a>{{ tag.name }}</a>
              <span v-if="tag.id === selectedTag">✕</span>
            </button>
          </li>
          <!-- <li
            v-for="tag in tags"
            :key="tag.id">
            <a>{{ tag.name }}</a>
          </li> -->
          <!-- <a>{{ tags }}</a> -->
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTag: null
    }
  },
  computed: {
    posts() {
      console.log('posts', this.$store.state.posts)
      return this.$store.state.posts
    },
    tags() {
      console.log('tags', this.$store.state.tags)
      return this.$store.state.tags
    },
    sortedPosts() {
      if (!this.selectedTag) {
        console.log('sortedPosts1', this.posts)
        return this.posts
      }
      console.log('sortedPosts2', this.posts.filter(el => el.tags.includes(this.selectedTag)))
      return this.posts.filter(el => el.tags.includes(this.selectedTag))
    }
  },
  created() {
    this.$store.dispatch('getPosts')
    this.$store.dispatch('getTags')
  },
  methods: {
    updateTag(tag) {
      if (!this.selectedTag) {
        this.selectedTag = tag.id
        console.log('this.selectedTag = tag.id', this.selectedTag)
      } else {
        this.selectedTag = null
        console.log('this.selectedTag = null', this.selectedTag)
      }
    }
  }
}
</script>

<style>

</style>
