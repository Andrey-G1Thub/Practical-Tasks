 
import { fetchAllPosts } from './api.js'
import {
  createForm,
  createSearchPosts,
  createButton,
  createPost,
} from './component/ui.js'

export const container: HTMLBodyElement | null = document.querySelector('body')

const initApp = async () => {
  console.log('initApp запущен!')
  createSearchPosts()
  createButton()
  createForm()

  const postData = await fetchAllPosts()
  postData?.forEach(({ post, comments }) => {
    createPost(post, comments)
  })
}

initApp()
