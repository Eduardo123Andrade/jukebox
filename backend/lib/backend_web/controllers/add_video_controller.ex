defmodule BackendWeb.AddVideoController do
  alias Youtube.VideoDetail
  use BackendWeb, :controller

  alias Plug.Conn
  alias Validate.ValidateUrl

  def add(%Conn{} = conn, params) do
    %{"name" => name, "url" => url} = params

    with {:ok, video_id} <- ValidateUrl.call(url),
         {:ok, video_detail} <- VideoDetail.get_youtube_video_details(video_id) do
      video_data = Map.put(video_detail, :user_name, name)

      conn
      |> put_status(:ok)
      |> render("added.json", video_data: video_data)
    end
  end
end
