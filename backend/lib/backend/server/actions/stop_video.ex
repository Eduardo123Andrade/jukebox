defmodule Backend.Server.Actions.StopVideo do
  alias Backend.Server.JukeboxData

  def call(%JukeboxData{current_video: current_video} = jukebox_data, _id)
      when is_nil(current_video) do
    {:ok, jukebox_data}
  end

  def call(%JukeboxData{current_video: current_video} = jukebox_data, id)
      when current_video.id != id do
    {:ok, jukebox_data}
  end

  def call(%JukeboxData{current_video: current_video} = jukebox_data, _id) do
    new_current_video = Map.put(current_video, :status, :stopped)
    new_data = Map.put(jukebox_data, :current_video, new_current_video)

    {:ok, new_data}
  end
end
