import { VideoDetail as VideoDetailInterface } from '@/interfaces'
import React from 'react'

interface VideoDetailProps {
  video: VideoDetailInterface
}

export const VideoDetail: React.FC<VideoDetailProps> = ({ video }) => {
  const { thumbnail, title, author } = video
  return (
    <div className="flex columns-2 bg-gray-800">
      <img src={thumbnail.url} alt="Thumbnail" />
      <div className="flex flex-col justify-center gap-5 text-white">
        <h3>{title}</h3>
        <h6>{author}</h6>
      </div>
    </div>
  )
}
