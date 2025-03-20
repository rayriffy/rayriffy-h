import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from "@tailwindcss/vite";

import type { UserConfig } from 'vite'

const config: UserConfig = {
  server: {
    allowedHosts: ['.pinggy.link']
  },
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      scope: '/',
      base: '/',
      registerType: 'prompt',
      manifest: {
        short_name: 'Riffy H',
        name: 'Riffy H',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#161e2e',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globDirectory: 'build',
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          // optimized image
          {
            urlPattern: /\/api\/_image.+$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'urami-image',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
          {
            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-image-assets',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:js)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-js-assets',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:css|less)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-style-assets',
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:json|xml|csv)$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'static-data-assets',
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\/api\/.*$/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'apis',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
            },
          },
          {
            urlPattern: /.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'others',
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
    // @ts-ignore
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            open: true,
          }),
        ]
      : []),
  ],
}

export default config
