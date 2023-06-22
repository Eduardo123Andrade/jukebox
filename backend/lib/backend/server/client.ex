defmodule Backend.Server.Client do
  def push(element) do
    GenServer.call(:jukebox_list, {:push, [element]})
  end

  def pop() do
    GenServer.call(:jukebox_list, :pop)
  end

  def get() do
    GenServer.call(:jukebox_list, :get)
  end
end
