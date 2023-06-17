import { Component } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/app/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  private supabase: SupabaseClient;
  subid: number = 0;
  questions: any;
  quiz: any;
  questionCount = 0;
  selectedOption: any;
  selectionArray = [];
  validation: any;


  constructor(private route: ActivatedRoute) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.route.queryParams.subscribe(params => { this.subid = params['subid']; });
  }
  async getQuestions() {
    //const { data, error } = await this.supabase.from('QNA').select('*').eq('sid', this.subid);
    //for now hard coded the sid, TBD
    const { data, error } = await this.supabase.from('QNA').select('*').eq('sid', 1);

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
    this.commonFuncOnNxtPrv()
    if (this.selectedOption) {
      this.quiz[this.questionCount].userSelection = this.selectedOption;
    }
    this.questionCount++;
    this.selectedOption = this.quiz[this.questionCount].userSelection;


    console.log("nxt ", this.questionCount,)
  }
  previousBtnHandler() {
    this.commonFuncOnNxtPrv()
    if (this.selectedOption) {
      this.quiz[this.questionCount].userSelection = this.selectedOption;
    }
    this.questionCount--;
    this.selectedOption = this.quiz[this.questionCount].userSelection;

    console.log("prv ", this.questionCount)
  }

  submitBtnHandler() {

    let correctAnswer = this.checkUndefinedOrNullOrEmptyString(this.quiz[this.questionCount].answer) ? this.quiz[this.questionCount].answer : this.quiz[this.questionCount].answer.trim();
    let userSelectedAnswer = this.checkUndefinedOrNullOrEmptyString(this.selectedOption) ? this.selectedOption : this.selectedOption.trim();
    if (!this.checkUndefinedOrNullOrEmptyString(correctAnswer) && !this.checkUndefinedOrNullOrEmptyString(userSelectedAnswer)) {
      this.validation = (correctAnswer === userSelectedAnswer) ? 'Correct Answer' : 'Oops! Not a right answer';
    } else {
      this.validation = 'Select an Answer';
    }
  }

  commonFuncOnNxtPrv() {
    this.validation = '';
  }

  checkUndefinedOrNullOrEmptyString(value: any) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    return false;
  }


}


