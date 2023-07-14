defmodule Backend.Server.Server do
  alias Backend.Server.Actions
  alias Backend.VideoStruct.VideoData
  alias Backend.Server.JukeboxData
  use GenServer
  require Logger

  # Server
  @impl true
  def init(video_list_state) do
    {:ok, video_list_state}
  end

  def start_link(_initial_state) do
    initial_state = %JukeboxData{
      current_video: nil,
      video_list: []
    }

    GenServer.start_link(__MODULE__, initial_state, name: :jukebox_list)
  end

  # SYNC
  @impl true
  def handle_call({:push, %VideoData{} = new_video}, _from, %JukeboxData{} = prev_state) do
    {:ok, new_data} = Actions.push_video(prev_state, [new_video])

    {:reply, new_data, new_data}
  end

  def handle_call(:play_video, _from, %JukeboxData{} = prev_state) do
    {:ok, data} = Actions.change_video(prev_state)
    {:reply, data, data}
  end

  def handle_call(:get, _from, prev_sate) do
    {:reply, prev_sate, prev_sate}
  end

  @impl true
  def handle_call(:pop, _from, []) do
    {:reply, nil, []}
  end

  @impl true
  def handle_cast(:stop_video, state) do
    {:ok, data} = Actions.stop_video(state)
    {:noreply, data}
  end
end
