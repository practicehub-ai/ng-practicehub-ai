import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  animateCount = 0; val = 0;
  interval: any;
  maxQuestions = 500;
  private supabase: SupabaseClient;
  subjects: any;

  constructor(private router: Router, private supabaseService: SupabaseService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  GoToPractice() {
    this.router.navigate(['/subject']);
  }
  user: any;
  loggedIn: any;
  ngOnInit() {

    this.supabaseService.authChanges((event, session) => {
      //console.log(event, session);
      this.user = session?.user;
      this.loggedIn = (session?.user != null);

      if (this.loggedIn) {
        this.router.navigate(['/subject']);
      }
    });
    this.fetchSubjects();
    this.startTimer()
  }
  async fetchSubjects() {
    //subject data
    const { data, error } = await this.supabase.from('Subjects').select('*');
    this.subjects = data;
    console.log(data);
    for (let subject of this.subjects) {
      this.fetchSubjectCount(subject);
    }
  }

  async fetchSubjectCount(subject: any) {
    //Query Need To Be Optimised
    const { data, error } = (await this.supabase.from('QNA').select('*').eq('sid', subject.id));
    subject.questionLength = data?.length;
    subject.description = "Become a PRO in " + subject.Subject + " (Text Need to be Added / Modified). (Text Need to be Added / Modified)."

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