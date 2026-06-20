import { initBotId } from 'botid/client/core'

initBotId({
  protect: [
    {
      path: '/api/auth/*',
      method: 'POST',
    },
    {
      path: '/',
      method: 'POST',
    },
    {
      path: '/agents/*',
      method: 'POST',
    },
    {
      path: '/profile',
      method: 'POST',
    },
    {
      path: '/favorites',
      method: 'POST',
    },
  ],
})
