defmodule Validate.ValidateUrl do
  alias Backend.Error
  @pattern ~r/v=(.*?)&/

  def call(url) do
    @pattern
    |> Regex.match?(url)
    |> get_match(url)
  end

  defp get_match(true, url) do
    [match_list] = Regex.scan(@pattern, url)
    [_ | [video_id]] = match_list

    {:ok, video_id}
  end

  defp get_match(false, _), do: {:error, Error.invalid_url()}
end
