import { createForm, createSearchPosts, createButton } from './component/ui.js'
export const container: HTMLBodyElement | null = document.querySelector('body')
 

const initApp = () => {
  console.log('initApp запущен!')
  createSearchPosts()
  createButton()
  createForm()
}

initApp()
