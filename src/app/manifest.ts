import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BlueCarbon Ledger',
    short_name: 'BlueCarbon Ledger',
    description:
      'BlueCarbon Ledger is a futuristic and immersive dashboard that visualizes real and simulated Mars weather data using NASA datasets. Built for Cosmos Hackathon by AjayInsane.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f1a', // dark space-like base
    theme_color: '#ff4d4d', // Mars red
    orientation: 'portrait',
    lang: 'en',
    icons: [


      
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      }
    ],
  }
}
