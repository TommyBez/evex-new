import { pixelBasedPreset, type TailwindConfig } from 'react-email'

const emailTailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        border: '#e8e8e8',
        brand: '#006bff',
        card: '#ffffff',
        foreground: '#171717',
        graphite: '#171717',
        muted: '#fafafa',
        mutedForeground: '#4d4d4d',
        primary: '#171717',
        primaryForeground: '#ffffff',
        secondary: '#f2f2f2',
      },
      fontFamily: {
        mono: ['"Geist Mono"', 'Consolas', 'monospace'],
        pixel: ['"Geist Mono"', 'Consolas', 'monospace'],
        sans: [
          '"Geist"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
} satisfies TailwindConfig

export default emailTailwindConfig
