import { HistoryStore, HistoryItem } from './HistoryStore'

export interface HistoryEvent {
  'history/toggle': HistoryItem
  'history/override': HistoryStore
}
