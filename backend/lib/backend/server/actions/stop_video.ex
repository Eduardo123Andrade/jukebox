defmodule Backend.Server.Actions.StopVideo do
  alias Backend.Server.JukeboxData

  def call(%JukeboxData{current_video: current_video} = jukebox_data)
      when is_nil(current_video) do
    {:ok, jukebox_data}
  end

  def call(%JukeboxData{current_video: current_video} = jukebox_data) do
    IO.inspect(current_video, label: "CURRENT_VIDEO")
    new_current_video = Map.put(current_video, :status, :stopped)
    IO.inspect(new_current_video, label: "NEW_CURRENT_VIDEO")
    new_data = Map.put(jukebox_data, :current_video, new_current_video)

    IO.inspect(new_data, label: "NEW_DATA")

    {:ok, new_data}
  end
end
