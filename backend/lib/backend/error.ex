defmodule Backend.Error do
  @keys [:status, :message]

  @enforce_keys @keys

  defstruct @keys

  def build(status, message) do
    %__MODULE__{
      status: status,
      message: message
    }
  end

  def build_not_found(message), do: build(:not_found, message)
  def video_not_found, do: build_not_found("Video not found")

  def invalid_data(message), do: build(:bad_request, message)
  def invalid_url, do: invalid_data("Invalid url")

  def internal_server_error, do: build(:internal_server_error, "Something wrong, try again later")
end
