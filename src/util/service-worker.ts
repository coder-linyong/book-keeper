// https才能使用service-worker，可通过chrome://flags/#unsafely-treat-insecure-origin-as-secure添加http地址到白名单
// eslint-disable-next-line no-undef
if ('serviceWorker' in navigator && ENV === 'production') {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
      registration.update()
      if (registration.installing) {
        console.log('离线文件安装中')
      }
      if (registration.waiting) {
        console.log('离线文件已安装')
      }
      if (registration.active) {
        console.log('离线文件已激活')
      }
    } catch (e) {
      console.error('安装失败！')
      console.error(e)
    }
  })
}
export {}