export const onServiceWorkerUpdateReady = () => {
  document.getElementById('sw-update-found').style.display = 'none'
  document.getElementById('sw-update-complete').style.display = 'flex'
}
