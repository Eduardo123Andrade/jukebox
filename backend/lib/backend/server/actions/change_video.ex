defmodule Backend.Server.Actions.ChangeVideo do
  alias Backend.Server.JukeboxData

  def call(%JukeboxData{} = jukebox_data) do
    change_current_video(jukebox_data)
  end

  defp change_current_video(%JukeboxData{video_list: video_list} = jukebox_data)
       when length(video_list) == 0 do
    {:ok, jukebox_data}
  end

  defp change_current_video(%JukeboxData{current_video: current_video} = jukebox_data)
       when current_video.status == :playing do
    {:ok, jukebox_data}
  end

  defp change_current_video(%JukeboxData{current_video: current_video, video_list: video_list})
       when is_nil(current_video) do
    data = test(video_list)

    {:ok, data}
  end

  defp change_current_video(%JukeboxData{
         current_video: current_video_data,
         video_list: video_list
       })
       when current_video_data.status == :stopped do
    data = test(video_list)
    {:ok, data}
  end

  defp test(video_list) do
    [current_video | tail] = video_list

    current_video = Map.put(current_video, :status, :playing)

    %JukeboxData{
      current_video: current_video,
      video_list: tail
    }
  end
end
