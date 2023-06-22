defmodule Backend.Server.Client do
  alias Backend.Jukebox.Video.Video
  alias Backend.Server.Server

  def start() do
    GenServer.start_link(Server, [], name: :jukebox_list)
  end

  def push(%Video{} = element) do
    GenServer.call(:jukebox_list, {:push, [element]})
  end

  def pop() do
    GenServer.call(:jukebox_list, :pop)
  end
end
