const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}
interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
type Comments = Comment[]

const container: HTMLBodyElement | null = document.querySelector('body')

const createPost = (post: Post, comments: Comments) => {
  const postConteiner: HTMLDivElement = document.createElement('div')
  postConteiner.id = 'post'
  postConteiner.className = 'post'

  //h1
  const postTitle: HTMLHeadingElement = document.createElement('h1')
  postTitle.className = 'post__title'
  postTitle.innerText = `Название Поста: ${post.title}`

  // <p class="post__text">Текст Поста</p>
  const postText: HTMLParagraphElement = document.createElement('p')
  postText.className = 'post__text'
  postText.innerText = `Текст Поста: ${post.body}`

  //<b class="post__comments-text">Комментарии</b>
  const postCommentsText: HTMLElement = document.createElement('b')
  postCommentsText.className = 'post__comments-text'
  postCommentsText.innerText = `Комментарии : ${comments.length}`

  // <div class="post__comments">
  const postComments: HTMLDivElement = document.createElement('div')
  postComments.className = 'post__comments'

  comments.forEach((element: Comment) => {
    // <div class="post-comment">
    const postComment: HTMLDivElement = document.createElement('div')
    postComment.className = 'post-comment'

    // <span class="post-comment__author">maxim@gmail.com</span>
    const postCommentAuthor: HTMLSpanElement = document.createElement('span')
    postCommentAuthor.className = 'post-comment__author'
    postCommentAuthor.innerText = `Автор : ${element.email}`

    // <span class="post-comment__text">
    const postCoomment: HTMLSpanElement = document.createElement('span')
    postCoomment.className = 'post-comment__text'
    postCoomment.innerText = `комментарий : ${element.body}`

    postComment.append(postCommentAuthor, postCoomment)
    postComments.append(postComment)
  })
  postConteiner.append(postTitle, postText, postCommentsText, postComments)
  container?.append(postConteiner)
}

const toggleHidden = () => {
  const loaderHTML: Element | null = document.querySelector('#loader')
  const isHidden: boolean | undefined = loaderHTML?.hasAttribute('hidden')
  if (isHidden) {
    //удаляет атрибут если есть
    loaderHTML?.removeAttribute('hidden')
  } else {
    loaderHTML?.setAttribute('hidden', '')
  }
}

const renderPost = async (id: number = 7): Promise<void> => {
  try {
    toggleHidden()

    const response: Response = await fetch(`${POSTS_URL}/${id}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Ошибка запроса')
    }

    const post: Post = await response.json()
    const postId = post.id

    const responseComment = await fetch(`${COMMENTS_URL}?postId=${postId}`)
    if (!responseComment.ok) {
      throw new Error('Ошибка запроса комментариев')
    }

    const comments: Comments = await responseComment.json()

    createPost(post, comments)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally')
    toggleHidden()
  }
}

renderPost(2)
