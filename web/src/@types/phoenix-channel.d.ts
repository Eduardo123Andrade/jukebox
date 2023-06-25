declare module 'phoenix-channels' {
  interface Channel {
    join(): Push
    on(event: string, callback: (response: any) => void): void
    push(event: string, payload: any): Push
  }

  interface Push {
    receive(status: string, callback: (response: any) => void): Push
  }

  interface Socket {
    connect(): void
    channel(topic: string, params?: {}): Channel
    onOpen(callback: () => void): void
    onClose(callback: () => void): void
    onError(callback: (error: any) => void): void
  }

  interface SocketConstructor {
    new (url: string, opts?: {}): Socket
  }

  const Socket: SocketConstructor

  export { Socket, Channel }
}
