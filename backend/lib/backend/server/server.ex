defmodule Backend.Server.Server do
  alias Jukebox.Video.Video
  use GenServer
  require Logger

  # Server
  @impl true
  def init(video_list_state) do
    {:ok, video_list_state}
  end

  # SYNC
  @impl true
  def handle_call({:push, [%Video{}] = video_list}, _from, video_list_state) do
    new_stack = video_list_state ++ video_list
    {:reply, new_stack, new_stack}
  end

  @impl true
  def handle_call(:pop, _from, [%Video{} = head | tail]) do
    {:reply, head, tail}
  end

  @impl true
  def handle_call(:pop, _from, []) do
    {:reply, nil, []}
  end
end
