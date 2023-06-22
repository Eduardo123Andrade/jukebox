defmodule BackendWeb.AddVideoController do
  alias Backend.Video.Add
  alias Youtube.VideoDetail
  use BackendWeb, :controller

  alias Plug.Conn
  alias Validate.ValidateUrl

  def add(%Conn{} = conn, params) do
    %{"name" => name, "url" => url} = params

    with {:ok, video_id} <- ValidateUrl.call(url),
         {:ok, video_detail} <- VideoDetail.get_youtube_video_details(video_id) do
      video_data =
        video_detail
        |> Map.put(:user_name, name)
        |> Map.put(:url, url)

      Add.call(video_data)

      conn
      |> put_status(:ok)
      |> render("added.json", video_data: video_data)
    end
  end
end
