import { Component } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/app/environments/environment';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  private supabase: SupabaseClient;
  questions: any;
  quiz: any;
  questionCount = 0;
  selectedOption: any;
  selectionArray = [];


  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);


  }
  async getQuestions() {
    const { data, error } = await this.supabase.from('QNA').select('*');

    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
  ngOnInit() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    this.questions = await this.getQuestions();

    this.quiz = this.questions.map((ques: any) => {
      return {
        sid: ques.sid,
        questions: ques.question,
        choices: ques.choices,
        answer: ques.answer,
        qid: ques.id
      }
    });
    console.log(this.quiz)

    this.selectedOption = this.quiz[0].choices.split(',')[1]
  }



  nextBtnHandler() {
    if (this.selectedOption) {
      this.quiz[this.questionCount].userSelection = this.selectedOption;
    }
    this.questionCount++;
    this.selectedOption = this.quiz[this.questionCount].userSelection;


    console.log("nxt ", this.questionCount,)
  }
  previousBtnHandler() {
    if (this.selectedOption) {
      this.quiz[this.questionCount].userSelection = this.selectedOption;
    }
    this.questionCount--;
    this.selectedOption = this.quiz[this.questionCount].userSelection;

    console.log("prv ", this.questionCount)
  }

  submitBtnHandler() {
    console.log(this.selectedOption)
  }

}


