defmodule Backend.Server.Server do
  use GenServer
  require Logger

  # Server
  @impl true
  def init(video_list_state) do
    {:ok, video_list_state}
  end

  def start_link(_initial_state) do
    initial_state = %{
      current_video: nil,
      video_list: []
    }

    GenServer.start_link(__MODULE__, initial_state, name: :jukebox_list)
  end

  # SYNC
  @impl true
  def handle_call({:push, video_list}, _from, prev_state) do
    %{video_list: video_list_state, current_video: current_video} = prev_state
    new_list = video_list_state ++ video_list

    new_data = %{
      current_video: current_video,
      video_list: new_list
    }

    {:reply, new_data, new_data}
  end

  def handle_call(:play_video, _from, %{video_list: video_list} = prev_state)
      when length(video_list) > 0 do
    %{video_list: video_list_state} = prev_state
    [current_video | tail] = video_list_state

    data = %{
      current_video: current_video,
      video_list: tail
    }

    {:reply, data, data}
  end

  def handle_call(:play_video, _from, %{video_list: video_list} = prev_state)
      when length(video_list) == 0 do
    {:reply, prev_state, prev_state}
  end

  def handle_call(:get, _from, prev_sate) do
    {:reply, prev_sate, prev_sate}
  end

  @impl true
  def handle_call(:pop, _from, []) do
    {:reply, nil, []}
  end
end
