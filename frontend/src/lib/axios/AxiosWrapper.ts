import { isNullOrUndefined } from 'util';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { cookieName } from '../constants';
import Cookies from 'js-cookie';

export enum verbs {
  put = 'put',
  post = 'post',
  get = 'get',
  delete = 'delete'
}

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

  public request(verb: verbs, url: string, data?: any): AxiosPromise<any> {
    switch (verb) {
      case verbs.post:
        return this.post(url, data);
      case verbs.put:
        return this.put(url, data);
      case verbs.get:
        return this.get(url, data);
      default:
        throw Error('Verb is not supported yet');
    }
  }

  private put(url: string, data?: any): AxiosPromise<any> {
    return axios.put(this.urlCombined(url), data, this.configWithToken());
  }

  private post(url: string, data?: any): AxiosPromise<any> {
    return axios.post(this.urlCombined(url), data, this.configWithToken());
  }

  private get(url: string, data?: any): AxiosPromise<any> {
    return axios.get(
      `${this.urlCombined(url)}?${this.encodeData(data)}`,
      this.configWithToken()
    );
  }

  /**
   * When this app would be released to production, this would help us get the right url for the right environment.
   */
  private url(): string {
    return 'http://127.0.0.1:4200/api';
  }

  private urlCombined(path: string): string {
    return `${this.url()}${path}`;
  }

  private configWithToken(): any {
    const { headers } = this.config;
    const token = Cookies.get(cookieName);

    return {
      headers: {
        ...headers,
        Authorization: token
      }
    };
  }

  private encodeData(data?: any): string {
    let encoded = '';
    if (data) {
      const props = [];
      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          props.push(
            `${encodeURIComponent(prop)}=${encodeURIComponent(data[prop])}`
          );
        }
      }

      encoded = props.join('&');
    }

    return encoded;
  }
}
