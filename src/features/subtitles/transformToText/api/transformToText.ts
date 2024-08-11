import { API_PATH } from '@/shared';
import { mainApi } from '@/shared';
import {
  ITransformToTextResponse,
  ITransforToTextRequest,
} from '../model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    subToText: builder.mutation<
      ITransformToTextResponse,
      ITransforToTextRequest
    >({
      query: (body) => ({
        url: `${API_PATH.TEXT}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubToTextMutation } = mainApiEndpoint;
