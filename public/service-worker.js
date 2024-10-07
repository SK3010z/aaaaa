self.addEventListener('push', async (event) => {
  const body = event.data?.text() || ''
  event.waitUntil(
    self.registration.showNotification('4Filas', {
      body,
      icon: './icon.png',
    }),
  )
})
