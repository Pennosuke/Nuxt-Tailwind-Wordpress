export const state = () => ({
  posts: []
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  }
}

export const actions = {
  async getPosts ({ state, commit, dispatch }) {
    if (state.posts.length) { return }
    try {
      let posts = await fetch('https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1')
        .then(response => response.json())
      posts = posts
        .filter(post => post.status === 'publish')
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))
      commit('updatePosts', posts)
    } catch (error) {
      console.log(error)
    }
  }
}
