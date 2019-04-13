import { isNullOrUndefined } from 'util';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

/**
 * Manages connection to API and makes axios calls with one point for the URLS.
 */
export class AxiosWrapper {
  public static getInstance(): AxiosWrapper {
    if (isNullOrUndefined(this.instance)) {
      this.instance = new AxiosWrapper();
    }

    return this.instance;
  }

  private static instance: AxiosWrapper;

  private config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  private constructor() {}

  public put(url: string, data?: any): AxiosPromise<any> {
    return axios.put(`${this.url()}${url}`, data, this.config);
  }

  /**
   * When this app would be released to production, this would help us get the right url for the right environment.
   */
  private url(): string {
    return 'http://127.0.0.1:4200/api';
  }
}
