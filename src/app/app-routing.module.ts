import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { RelogComponent } from './relog/relog.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz/:email', component: QuizComponent },
  { path: 'relog', component: RelogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
