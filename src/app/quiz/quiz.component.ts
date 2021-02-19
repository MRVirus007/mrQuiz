import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  labeli = "labeli";
  inputi = "inputi";
  fieldseti = "fieldseti";

  currentIndex = 0;

  score;
  totalQuestions;
  quizOver;

  @ViewChild(QuestionComponent) question: QuestionComponent;

  @Output() answers =
    new EventEmitter<{ user_answer: string, correct_answer: string }>();

  ngOnInit(): void {
    // if (this.question.userAnswer === this.question.correctAnswer) {
    //   this.question.userAnswer.color = "green"
    // }
    // else {
    //   this.question.userAnswer.color = "red";
    // }
  }

  constructor() {

  }

  goNext() {
    this.currentIndex++;
    this.updateScore();

    if (this.currentIndex === this.totalQuestions) {
      this.endQuiz();
    }
  }

  updateScore() {
    if (this.question.userAnswer === this.question.correctAnswer) {
      this.score++;
    }
    else {
      //this.question.color = "red";
    }
  }

  endQuiz() {
    this.quizOver = true;
    alert('Quiz Over! Score is ' + this.score + '/ ' + this.totalQuestions);
  }

  goPrevious() {
    this.currentIndex--;
  }

  receiveAnswers(receivedAnswers) {
    console.log(receivedAnswers);
  }



  getTotalQuestions(totalQuestions: number) {
    this.totalQuestions = totalQuestions;
  }

  restartQuiz() {
    this.quizOver = false;
    this.score = 0;
    this.currentIndex = 0;
  }

}
