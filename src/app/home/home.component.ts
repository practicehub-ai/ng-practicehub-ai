import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  subjectCards: any = [
    {
      "subject": "Mathematics",
      "subjectText": "Our AI-powered platform that provides students with a unique learning experience by offering a wide range of multiple- choice questions in Maths."
    },
    // {
    //   "subject": "Physics",
    //   "subjectText": "AI-powered multiple-choice questions for physics, designed to enhance students' learning experience and deepen their understanding of the subject."
    // },
    {
      "subject": "Chemistry",
      "subjectText": "AI-generated multiple-choice questions in chemistry, empowering them to master the subject through interactive and engaging practice."
    },
    {
      "subject": "Biology",
      "subjectText": "AI-generated multiple-choice questions in biology, equipping students with interactive learning tools to strengthen their understanding."
    }
  ];

}
