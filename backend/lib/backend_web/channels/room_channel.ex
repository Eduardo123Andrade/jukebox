defmodule BackendWeb.RoomChannel do
  alias Backend.Server.Client
  use BackendWeb, :channel

  @impl true
  def join("room:lobby", payload, socket) do
    IO.inspect(payload, label: "PAYLOAD")
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  def handle_in("play_video", _payload, socket) do
    Client.play_video()
    {:noreply, socket}
  end
end
