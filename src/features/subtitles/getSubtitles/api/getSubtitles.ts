import { API_PATH } from '@/shared';
import { mainApi } from '@/shared';
import { IGetSubtitleRequest, IGetSubtitleResponse } from '../model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubtitles: builder.mutation<IGetSubtitleResponse, IGetSubtitleRequest>({
      query: (body) => ({
        url: `${API_PATH.SUBS}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetSubtitlesMutation } = mainApiEndpoint;
