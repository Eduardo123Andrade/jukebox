defmodule Backend.Server.Actions do
  alias Backend.Server.Actions.StopVideo
  alias Backend.Server.Actions.PushVideo
  alias Backend.Server.Actions.ChangeVideo
  alias Backend.Server.JukeboxData

  def change_video(%JukeboxData{} = jukebox_data), do: ChangeVideo.call(jukebox_data)
  def stop_video(%JukeboxData{} = jukebox_data, id), do: StopVideo.call(jukebox_data, id)

  def push_video(%JukeboxData{} = jukebox_data, video_list) do
    PushVideo.call(jukebox_data, video_list)
  end
end
