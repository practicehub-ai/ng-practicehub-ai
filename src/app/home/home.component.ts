import { Component } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/app/environments/environment';

// Create a single supabase client for interacting with your database


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private supabase:SupabaseClient;
  subjects: any = [];
  subjectCards: any = [];
  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);    
  }
  
  async getSubjects(){  
    const { data, error } = await this.supabase.from('Subjects').select('*');

    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
  ngOnInit() {
    this.fetchSubjects();
  }

  async fetchSubjects() {
    this.subjects = await this.getSubjects();
    console.log(this.subjects);
    this.subjectCards = this.subjects.map((subject: any) => {
      return {
        id: subject.id,
        subject: subject.Subject,
        subjectText:'Our AI-powered platform that provides students with a unique learning experience by offering a wide range of multiple- choice questions in ' + subject.Subject + '.'
      }
    });
  }

  

}
