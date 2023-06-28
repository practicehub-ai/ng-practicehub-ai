import { Component } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';
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
  maxQuestionCount: number = 40;
  prevQno: any;
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
      this.qnoBtnHandler(0);
    });
    console.log(this.quiz)

    //this.selectedOption = this.quiz[0].choices.split(',')[1]
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

  optionChange(evt: Event) {
    //this.quiz[this.questionCount].userSelection = this.selectedOption;
    console.log(evt)
  }
  qnoBtnHandler(qno: number) {
    this.prevQno = this.questionCount;
    if (this.selectedOption) {
      this.quiz[this.prevQno].userSelection = this.selectedOption;
    }
    this.questionCount = qno;
    if (this.quiz[this.questionCount].userSelection) {
      this.selectedOption = this.quiz[this.questionCount].userSelection;
    } else {
      this.selectedOption = "";
    }



    console.log(this.prevQno + "prevQno----quc ", this.questionCount)

  }

  //function to return list of numbers from 0 to n-1
  numSequence(n: number): Array<number> {
    let numArr = [];
    for (var i = n - 10; i < n; i++) {
      numArr.push(i);
    }
    return numArr;
  }

  submitBtnHandler() {

    let correctAnswer = this.checkUndefinedOrNullOrEmptyString(this.quiz[this.questionCount].answer) ? this.quiz[this.questionCount].answer : this.quiz[this.questionCount].answer.trim();
    let userSelectedAnswer = this.checkUndefinedOrNullOrEmptyString(this.selectedOption) ? this.selectedOption : this.selectedOption.trim();
    if (!this.checkUndefinedOrNullOrEmptyString(correctAnswer) && !this.checkUndefinedOrNullOrEmptyString(userSelectedAnswer)) {
      this.validation = (correctAnswer === userSelectedAnswer) ? 'right' : 'wrong';
    } else {
      this.validation = 'not-answered';

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


