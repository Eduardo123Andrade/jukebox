import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import React from 'react'

interface VideoDetailProps {
  video: VideoDetailInterface
}

export const VideoDetail: React.FC<VideoDetailProps> = ({ video }) => {
  const { thumbnail, title, author, userName } = video
  const alt = `Thumbnail - ${title}`

  return (
    <div className="flex columns-2 gap-5 border-b border-b-gray-600 bg-gray-800">
      <div className="flex flex-col justify-center">
        <label className="text-sm text-gray-400">{userName}</label>
        <img src={thumbnail.url} alt={alt} />
      </div>
      <div className="flex flex-col justify-center gap-2 text-white">
        <h3>{title}</h3>
        <h6>{author}</h6>
      </div>
    </div>
  )
}
