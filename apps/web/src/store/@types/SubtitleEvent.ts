import { SubtitleStore } from './SubtitleStore'

export interface SubtitleEvent {
  'subtitle/override': SubtitleStore
  'subtitle/setSubtitle': string
}
