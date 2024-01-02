import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss',
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';
  result: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      this.questionSelected = this.questions[this.questionIndex];
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.result = finalAnswer === 'B' ? 'Hero' : 'Villain';
      this.answerSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
    }
  }

  async checkResult(answersValues: string[]) {
    return answersValues.reduce((previous, current, _i, arr) =>
      arr.filter((item) => item === previous).length >
      arr.filter((item) => item === current).length
        ? previous
        : current
    );
  }

  async clearResult() {
    this.finished = false;
    this.answers = [];
    this.answerSelected = '';
    this.result = '';
    this.questionIndex = 0;
  }
}
