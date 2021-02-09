import React from 'react';
import axios, { Method } from 'axios';

type RequestParams = {
  method?: Method;
  url: string;
  data?: object;
  params?: object;
}

const BASE_URL = 'https://api.github.com/users/';

export const makeRequest = ({ method = 'GET', url, data, params }: RequestParams) => {
  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params
  });
};
