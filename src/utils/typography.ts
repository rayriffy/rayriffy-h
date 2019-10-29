import Typography from 'typography'

const fontSets = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'PingFang SC',
  'Hiragino Sans GB',
  'Microsoft YaHei',
  'Helvetica Neue',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
]

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  bodyFontFamily: fontSets,
  headerFontFamily: fontSets,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
