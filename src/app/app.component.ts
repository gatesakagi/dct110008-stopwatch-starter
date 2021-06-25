import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  second = 0.0;
  totalLapTimes: Array<number> = [];
  oddLapTimes: Array<number> = [];
  evenLapTimes: Array<number> = [];
  intervalTimerSubscription$: Subscription = new Subscription;
  isStopTimer = false;
  clickStartDisabled = false;
  clickPauseDisabled = true;
  clickStopDisabled = true;
  clickDivideDisabled = true;

  ngOnInit() {

  }

  start() {
    this.second = this.isStopTimer ? 0.0 : this.second;

    this.intervalTimerSubscription$ = timer(0, 100).subscribe(()=>{
      this.second += 0.1;
    });

    if (this.intervalTimerSubscription$.closed === false){
      this.clickStartDisabled = true;
      this.clickPauseDisabled = false;
      this.clickStopDisabled = false;
      this.clickDivideDisabled = false;
      this.isStopTimer = false;
    }
  }

  pause() {
    this.intervalTimerSubscription$.unsubscribe();
    this.clickPauseDisabled = true;
    this.clickStartDisabled = false;
    this.clickStopDisabled = false;
    this.clickDivideDisabled = true;
  }

  stop() {
    this.intervalTimerSubscription$.unsubscribe();
    this.isStopTimer = true;
    this.clickPauseDisabled = true;
    this.clickStartDisabled = false;
    this.clickStopDisabled = true;
    this.clickDivideDisabled = true;
  }

  divide() {
    this.totalLapTimes.push(this.second);
    this.oddLapTimes = this.totalLapTimes.filter((value, index) => index % 2 === 0);
    this.evenLapTimes = this.totalLapTimes.filter((value, index) => index % 2 === 1);
  }
}
