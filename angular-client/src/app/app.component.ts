import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PusherService } from './pusher.service';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works';

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of tweets
  tweets: any[] = [];

  constructor(
  private _http: Http,
  private pusherService: PusherService) { }

  // Angular 5 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllTweets();
    const channel = this.pusherService.pusher.subscribe('tweets');
    channel.bind('newTrigger', (data) => {
      // console.log(data);
      this.tweets = data.tweets;
    });

  }

  // // Add one tweet to the API
  // addTweet(text, date) {
  //   this._http.post(`${this.API}/tweets`, {text, date})
  //     .map(res => res.json())
  //     .subscribe(() => {
  //       this.getAllTweets();
  //     })
  // }

  getAllTweets() {
    this._http.get(`${this.API}/tweets`)
      .map(res => res.json())
      .subscribe(tweets => {
        // console.log(tweets);
        this.tweets = tweets
      })
  }
}
