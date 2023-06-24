defmodule Backend.Server.Client do
  alias Backend.Video.Send

  def push(element) do
    response = GenServer.call(:jukebox_list, {:push, [element]})
    Send.call(response)

    response
  end

  def play_video() do
    response = GenServer.call(:jukebox_list, :play_video)
    Send.call(response)
    response
  end

  def get() do
    GenServer.call(:jukebox_list, :get)
  end
end
