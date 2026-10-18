export const toggleHidden = () => {
  const loaderHTML: Element | null = document.querySelector('#loader')
  const isHidden: boolean | undefined = loaderHTML?.hasAttribute('hidden')
  if (isHidden) {
    //удаляет атрибут если есть
    loaderHTML?.removeAttribute('hidden')
  } else {
    loaderHTML?.setAttribute('hidden', '')
  }
}
