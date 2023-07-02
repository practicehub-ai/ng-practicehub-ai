import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  animateCount = 0; val = 0;
  interval: any;
  maxQuestions = 200;
  router: any;

  constructor(router:Router) { this.router=router;}
  ngOnInit() {    
    if (localStorage.getItem('practiceUserId') !== "undefined"){
      this.router.navigate(['/subject']);      
    }
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