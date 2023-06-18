defmodule BackendWeb.AddVideoController do
  use BackendWeb, :controller

  alias Plug.Conn

  def add(%Conn{} = conn, params) do
    IO.inspect(params)

    conn
    |> put_status(:ok)
    |> render("added.json")
  end
end
