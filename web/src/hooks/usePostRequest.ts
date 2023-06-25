import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  MutationStatus,
} from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { API } from '@/lib/api'

export type UsePostRequestStatus = MutationStatus

export type UsePostRequestOptionsType<TData, TError, TVariables> =
  UseMutationOptions<AxiosResponse<TData>, AxiosError<TError>, TVariables, any>

export const usePostRequest = <TData = any, TVariables = any, TError = any>(
  url: string,
  options?: UsePostRequestOptionsType<TData, TError, TVariables>
) => {
  const mutationFunction: MutationFunction<AxiosResponse<TData>, TVariables> = (
    data
  ) => API.post(url, data)

  return useMutation<AxiosResponse<TData>, AxiosError<TError>, TVariables, any>(
    mutationFunction,
    options
  )
}
