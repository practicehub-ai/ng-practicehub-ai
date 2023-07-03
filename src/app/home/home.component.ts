import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
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

  constructor(private router: Router,private supabaseService: SupabaseService) { }
  
  GoToPractice(){
    this.router.navigate(['/subject']);
  }
  user: any;
  loggedIn: any;
  ngOnInit() {
    this.supabaseService.authChanges((event, session) => {     
      //console.log(event, session);
      this.user = session?.user;
      this.loggedIn = (session?.user != null);

      if(this.loggedIn){
        this.router.navigate(['/subject']);
      }
    });
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