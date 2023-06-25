defmodule BackendWeb.FallbackController do
  use BackendWeb, :controller

  alias Backend.Error
  alias BackendWeb.ErrorView

  def call(conn, {:error, %Error{status: status, message: message}}) do
    conn
    |> put_status(status)
    |> put_view(ErrorView)
    |> render("error.json", message: message)
  end
end
