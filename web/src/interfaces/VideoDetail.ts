import { Thumbnail } from './Thumbnail'

export interface VideoDetail {
  id: string
  videoId: string
  title: string
  author: string
  thumbnail: Thumbnail
  userName: string
  url: string
}
