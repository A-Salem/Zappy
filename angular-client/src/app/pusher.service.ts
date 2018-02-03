import { Injectable } from '@angular/core';

import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

declare const Pusher;

// import { data_json } from './../../config.json';
//
// const config = './../../config.json';

@Injectable()
export class PusherService {

  pusher: any;
  config: any;
  constructor(private _http: Http) {
    this.pusher = new Pusher('e0fc4ad3df2dd4a475b1', {
      cluster: 'eu'
    });
  }

}
