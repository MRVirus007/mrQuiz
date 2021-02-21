import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { UserService } from '../shared/user.service'
import { ActivatedRoute } from '@angular/router';
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
  score: number = 0;
  totalQuestions;
  quizOver;
  email;
  userD;
  @ViewChild(QuestionComponent) question: QuestionComponent;

  @Output() answers =
    new EventEmitter<{ user_answer: string, correct_answer: string }>();

  ngOnInit(): void {
    this.uService.getUsersScore().subscribe(res => {
      this.userD = res;
    })
  }

  constructor(public uService: UserService, public actRoute: ActivatedRoute) {

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
  }

  endQuiz() {
    this.quizOver = true;
    this.email = this.actRoute.snapshot.paramMap.get('email');
    this.uService.updateDoc(this.email, this.score);
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
