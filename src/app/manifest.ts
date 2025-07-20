import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mars Weather Dashboard',
    short_name: 'Mars',
    description:
      'A visually immersive dashboard that simulates and visualizes Mars weather using real and simulated NASA data. Built for Cosmos Hackathon by AjayInsane.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
