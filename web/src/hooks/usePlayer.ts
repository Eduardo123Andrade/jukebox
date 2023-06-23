import { PlayerContext } from '@/providers'
import { useContext } from 'react'

export const usePlayer = () => {
  const context = useContext(PlayerContext)

  if (!context) throw new Error('This hook needs be wrapped by PlayerProvider')

  return context
}
