defmodule BackendWeb.AddVideoController do
  alias Backend.Video.Send
  alias Backend.Video.Add
  alias Youtube.VideoDetail
  use BackendWeb, :controller

  alias Plug.Conn
  alias Validate.ValidateUrl

  def add(%Conn{} = conn, params) do
    %{"name" => name, "url" => url} = params

    with {:ok, video_id} <- ValidateUrl.call(url),
         {:ok, video_detail} <- VideoDetail.get_youtube_video_details(video_id) do
      # response =
      video_detail
      |> Map.put(:user_name, name)
      |> Map.put(:url, url)
      |> Add.call()
      |> Send.call()

      # IO.inspect(response, label: "TEST")

      conn
      |> put_status(:ok)
      |> render("added.json")
    end
  end
end
