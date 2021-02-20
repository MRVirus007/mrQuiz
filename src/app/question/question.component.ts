import { style } from '@angular/animations';
import { Component, DoCheck, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, DoCheck {

  color = "none";
  labeli = "labeli";
  inputi = "inputi";
  fieldseti = "fieldseti";
  questions: any;
  currentOptions: string[];
  userAnswer;
  correctAnswer;
  checkAnswer = false;
  @Input() questionIndex: number;
  currentQuestion: string;

  @Output() answers =
    new EventEmitter<{ user_answer: string, correct_answer: string }>();

  @Output() totalQuestions = new EventEmitter<number>();

  constructor(@Inject(QuizComponent) private parent: QuizComponent) { }

  ngOnInit(): void {
    this.questions = [
      {
        question: 'How many months have 28 days?',
        options: ['All', '1', '0', '2'],
        answer: 'All'
      },
      {
        question: 'A farmer had 17 goats. All but six died. How many survived?',
        options: ['6', '11', '0', '17'],
        answer: '6'
      },
      {
        question: 'The odd one out is:',
        options: ['Fortnight', 'Calendar', 'Day', 'Month'],
        answer: 'Calendar'
      },
      {
        question: 'I am a 7 letter word.I am very heavy. Take away 2 letters and you will get 8. Take away 1 letter and you will get 80.',
        options: ['Weights', 'Sleighs', 'Brights', 'Weighty'],
        answer: 'Weighty'
      },
      {
        question: 'OASIS is to SAND, as ISLAND is to _____.',
        options: ['Waves', 'Water', 'Ocean', 'Sea'],
        answer: 'Water'
      },
    ];
    this.questions = this.questions.sort(() => Math.random() - 0.5);
    this.totalQuestions.emit(this.questions.length);
  }

  ngDoCheck(): void {
    this.currentQuestion = this.questions[this.questionIndex].question;
    this.currentOptions = this.questions[this.questionIndex].options;
  }

  setUserAnswer(option: string) {
    this.userAnswer = option;
    this.correctAnswer = this.questions[this.questionIndex].answer;
    this.answers.emit(
      { user_answer: this.userAnswer, correct_answer: this.correctAnswer });
    setTimeout(() => {
      this.parent.goNext();
      this.checkAnswer = false;
    }, 1000);

    if (this.userAnswer === this.correctAnswer) {
      console.log("Correct");
      this.labeli = "labeli";
      this.inputi = "inputi";
      this.checkAnswer = false;
    }
    else {
      console.log("Incorrect");
      this.labeli = "labeli2";
      this.inputi = "inputi2";
      this.checkAnswer = true;
    }
  }

}
