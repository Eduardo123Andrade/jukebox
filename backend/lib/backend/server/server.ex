defmodule Backend.Server.Server do
  use GenServer
  require Logger

  # Server
  @impl true
  def init(video_list_state) do
    {:ok, video_list_state}
  end

  def start_link(_initial_state) do
    GenServer.start_link(__MODULE__, [], name: :jukebox_list)
  end

  # SYNC
  @impl true
  def handle_call({:push, video_list}, _from, video_list_state) do
    new_stack = video_list_state ++ video_list
    {:reply, new_stack, new_stack}
  end

  @impl true
  def handle_call(:pop, _from, [head | tail]) do
    data = %{head: head, tail: tail}
    {:reply, data, tail}
  end

  def handle_call(:get, _from, video_list) do
    {:reply, video_list, video_list}
  end

  @impl true
  def handle_call(:pop, _from, []) do
    {:reply, nil, []}
  end
end
