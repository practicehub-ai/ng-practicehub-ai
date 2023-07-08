import { Component } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { json } from 'express';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  optionElArr: any = [];
  private supabase: SupabaseClient;
  subid: number = 0;
  practiceUserId: any;
  maxQuestionCount: number = 40;
  prevQno: any;
  questions: any;
  quiz: any;
  questionCount = 0;
  selectedOption: any;
  selectionArray = [];
  validation: any;
  qnoBtnElArr: any = [];
  activePractice: any;
  startRange:number=0;
  endRange:number=0;


  constructor(private route: ActivatedRoute) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.route.queryParams.subscribe(params => { this.subid = Number(params['subid']); });
    this.practiceUserId=localStorage.getItem('practiceUserId');
    if(this.practiceUserId) this.practiceUserId=JSON.parse(this.practiceUserId);
  }
  async getActivePractice() {
    const { data, error } = await this.supabase.from('ActivePractice').select('*').eq('SubjectId', this.subid).eq('UserId', this.practiceUserId);

    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
  async getProfile() {
    const { data, error } = await this.supabase.from('Profile').select('*').eq('Id', this.practiceUserId);

    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
  async saveActivePractice() {
    const { data, error } = await this.supabase.from('ActivePractice').insert([{ 
                                                          SubjectId: this.subid, 
                                                          UserId: this.practiceUserId,
                                                          StartTime: new Date().toISOString(),
                                                          StartRange: this.startRange,
                                                          EndRange: this.endRange }]);

    if (error) {
      console.log(error);
      return;
    }
    return data;
  }
  async getQuestions() {
    //const { data, error } = await this.supabase.from('QNA').select('*').eq('sid', this.subid);
    //for now hard coded the sid, TBD
    //const {apData,aperror} = await this.supabase.from('ActicePractice').select('*').eq('sid', this.subid);
    this.activePractice = await this.getActivePractice();
    console.log("activePractice ", this.activePractice)
    if (this.activePractice && this.activePractice.length>0) {
      console.log("active practice found for this user and subject");
      this.startRange = this.activePractice[0].Status=="Completed"? this.activePractice[0].EndRange:this.activePractice[0].StartRange;
      this.endRange = (this.startRange+this.maxQuestionCount);
    }
    else {
      console.log("no active practice found for this user and subject");
      this.startRange=1;
      this.endRange=(this.startRange+this.maxQuestionCount)-1;
      await this.saveActivePractice();
    }

    const { data, error } = await this.supabase.from('QNA').select('*').eq('sid', this.subid).range(this.startRange,this.endRange);

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  }
  ngOnInit() {
    this.fetchQuestions();
    this.qnoBtnElArr = document.getElementsByClassName('qno-btn');
    this.qnoBtnHandler(0);

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

    //this.selectedOption = this.quiz[0].choices.split(',')[1]
  }



  nextBtnHandler() {
    this.commonFuncOnNxtPrv()
    if (this.selectedOption) {
      this.quiz[this.questionCount].userSelection = this.selectedOption;
    }
    this.submitBtnHandler();
    this.questionCount++;
    this.selectedOption = this.quiz[this.questionCount].userSelection;

    if (this.checkUndefinedOrNullOrEmptyString(this.quiz[this.questionCount].validation)) {
      let currBtn = this.qnoBtnElArr[this.questionCount] as HTMLDivElement;
      currBtn.style.background = "yellow";
    }

    console.log("nxt ", this.questionCount,)
  }
  previousBtnHandler() {
    this.commonFuncOnNxtPrv()
    if (this.selectedOption) {
      this.quiz[this.questionCount].userSelection = this.selectedOption;
    }
    this.submitBtnHandler();
    this.questionCount--;
    this.selectedOption = this.quiz[this.questionCount].userSelection;


    if (this.checkUndefinedOrNullOrEmptyString(this.quiz[this.questionCount].validation)) {
      let currBtn = this.qnoBtnElArr[this.questionCount] as HTMLDivElement;
      currBtn.style.background = "yellow";
    }

    console.log("prv ", this.questionCount)
  }


  qnoBtnHandler(qno: number) {

    if (this.checkUndefinedOrNullOrEmptyString(this.quiz[qno].validation)) {
      let currBtn = this.qnoBtnElArr[qno] as HTMLDivElement;
      currBtn.style.background = "yellow";
    }
    this.prevQno = this.questionCount;
    if (this.selectedOption) {
      this.quiz[this.prevQno].userSelection = this.selectedOption;
    }
    this.submitBtnHandler();
    this.questionCount = qno;

    if (this.quiz[this.questionCount].userSelection) {
      this.selectedOption = this.quiz[this.questionCount].userSelection;
    } else {
      this.selectedOption = "";
    }

    console.log(this.prevQno + "prevQno----quc ", this.questionCount);

  }

  //function to return list of numbers from 0 to n-1
  numSequence(n: number): Array<number> {
    let numArr = [];
    for (var i = n - 10; i < n; i++) {
      numArr.push(i);
    }
    return numArr;
  }

  optionChanged(index: any) {
    this.quiz[this.questionCount].validation = '';
    this.quiz[this.questionCount].selectedOptionSeqNo = index;
  }


  submitBtnHandler() {
    console.log("submit");
    this.optionElArr = document.getElementsByClassName('options');
    let correctAnswer = this.checkUndefinedOrNullOrEmptyString(this.quiz[this.questionCount].answer) ? this.quiz[this.questionCount].answer : this.quiz[this.questionCount].answer.trim();
    let userSelectedAnswer = this.checkUndefinedOrNullOrEmptyString(this.selectedOption) ? this.selectedOption : this.selectedOption.trim();
    let currBtn = this.qnoBtnElArr[this.questionCount] as HTMLDivElement;
    if (!this.checkUndefinedOrNullOrEmptyString(correctAnswer) && !this.checkUndefinedOrNullOrEmptyString(userSelectedAnswer)) {
      this.validation = (correctAnswer === userSelectedAnswer) ? 'right' : 'wrong';
      if (this.validation === 'right') {
        this.quiz[this.questionCount].validation = "Y"
        currBtn.style.background = "green";
      } else if (this.validation === 'wrong') {
        this.quiz[this.questionCount].validation = "N"
        currBtn.style.background = "red";

        //let currOptionSeqNo = this.quiz[this.questionCount].selectedOptionSeqNo;
        //sthis.optionElArr[currOptionSeqNo]
      }
    }
  }



  commonFuncOnNxtPrv() {
    this.validation = '';
    //this.submitBtnHandler()
  }

  checkUndefinedOrNullOrEmptyString(value: any) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    return false;
  }


}


