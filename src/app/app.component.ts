import { Component, OnInit } from '@angular/core';

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
  intervalTimer: any;
  isStartTimer = false;
  clickStartDisabled = false;
  clickPauseDisabled = true;
  clickStopDisabled = true;
  clickDivideDisabled = true;

  ngOnInit() {

  }

  start() {
    if(this.isStartTimer === false){
      this.intervalTimer = setInterval(() => {
        this.second += 0.1;
      }, 100);
      this.clickStartDisabled = true;
      this.clickPauseDisabled = false;
      this.clickStopDisabled = false;
      this.clickDivideDisabled = false;
      this.isStartTimer = true;

    }
    console.log('start');
  }

  pause() {
    clearTimeout(this.intervalTimer);
    this.isStartTimer = false;
    this.clickPauseDisabled = true;
    this.clickStartDisabled = false;
    this.clickStopDisabled = false;
    this.clickDivideDisabled = true;
  }

  stop() {
    clearTimeout(this.intervalTimer);
    this.second = 0;
    this.isStartTimer = false;
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
