export const onServiceWorkerInstalled = () => {
  document.getElementById('sw-update-found').style.display = 'none'
  document.getElementById('sw-update-installed').style.display = 'flex'

  setTimeout(() => {
    document.getElementById('sw-update-installed').style.display = 'none'
  }, 5000)
}
