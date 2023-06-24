import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  animateCount = 0; val = 0;
  interval: any;
  maxQuestions = 200;

  constructor() { }
  ngOnInit() {
    this.startTimer()
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.animateCount += (2 * this.val);
      this.val++;
      if (this.animateCount >= this.maxQuestions) {
        this.animateCount = this.maxQuestions;
        clearInterval(this.interval);
      }
    }, 100)
  }
}