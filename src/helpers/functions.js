export const insertCSS = (webview) => {
  webview.insertCSS('body::-webkit-scrollbar { width: 0 !important }')
}

export const handleCursor = (mouseEvent, menu) => {
  if (mouseEvent.clientY <= 60 && menu.style.display === 'none') {
    menu.style.display = 'flex'
    console.log('Match: ', mouseEvent.clientY)
  } else if (mouseEvent.clientY > 60 && menu.style.display === 'flex') {
    menu.style.display = 'none'
    console.log('No match: ', mouseEvent.clientY)
  }

  console.log('Mouse is currently at: ', mouseEvent.clientY)
}

export default {
  insertCSS,
  handleCursor
}
