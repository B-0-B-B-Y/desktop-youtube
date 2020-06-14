export const insertCSS = (webview) => {
  webview.insertCSS('body::-webkit-scrollbar { width: 0 !important }')
}

export const handleEnterFullscreen = (menu, player) => {
  menu.style.display = 'none'
  Object.assign(player.style, { height: '100%', position: 'relative' })
}

export const handleLeaveFullscreen = (menu, player) => {
  menu.style.display = 'flex'
  Object.assign(player.style, { height: 'calc(100% - 60px)', position: 'absolute' })
}

export default {
  insertCSS,
  handleEnterFullscreen,
  handleLeaveFullscreen
}
