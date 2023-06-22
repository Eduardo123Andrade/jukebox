defmodule BackendWeb.AddVideoController do
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

      conn
      |> put_status(:ok)
      |> render("added.json", video_data: video_data)
    end
  end
end
