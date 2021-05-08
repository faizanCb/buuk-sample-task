import { Component, OnInit } from '@angular/core';
import { NumberInput } from 'ng-zorro-antd/core/types';
import {
  Answer,
  OverallStatistics,
  Question,
  Response,
  SubmittedTestDTO,
  Test,
} from './models';
import { QuizService } from './services/quiz.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'buuk-frontend';
  currentPage: number = 1;
  currentSize: number = 10;
  totalTests: number = 100;
  currentTest: Test = {
    id: 5674,
    questions: [],
  };
  overallStats: OverallStatistics = {
    duration: 0,
    average: 0,
    numberOfTests: 0,
  };
  testStartTime: Number = 0;
  currentQuestions: Question[] = [];
  currentAnswers: Answer[] = [];
  listOfData: Test[] = [];

  isVisible = false;
  isOkLoading = false;
  radioValue = 'A';

  current = 0;

  index: Question = {
    id: 8,
    description: 'Germany is the _________ most visited country in the world. ',
    options: [
      {
        label: 'A',
        value: '2nd',
      },
      {
        label: 'B',
        value: '15th',
      },
      {
        label: 'C',
        value: '7th',
      },
    ],
    answer: {
      label: 'C',
      value: '7th',
    },
  };

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService
      .getOverallStatistics()
      .subscribe((overallStatsResponse: any) => {
        let overallStatsResponseObject = overallStatsResponse.data[0];
        this.overallStats = {
          duration: overallStatsResponseObject.duration || 0,
          numberOfTests: overallStatsResponseObject.numberOfTests || 0,
          average: overallStatsResponseObject.average || 0,
        };
        this.getLatestTests()
      });
  }

  getLatestTests(page: number = 1, limit: number = 10){
    this.quizService.getTests(page, limit).subscribe((testResponse:any) => {
      this.listOfData = testResponse.data;
      this.totalTests = testResponse.count || 100;
    })
  }
  pre(): void {
    this.current -= 1;
    this.radioValue = '';
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.radioValue = '';
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = <Question>this.currentQuestions[0] || null;
        break;
      }
      case 1: {
        this.index = <Question>this.currentQuestions[1] || null;
        break;
      }
      case 2: {
        this.index = <Question>this.currentQuestions[2] || null;
        break;
      }
      case 3: {
        this.index = <Question>this.currentQuestions[3] || null;
        break;
      }
      default: {
        this.index = this.index = <Question>this.currentQuestions[3] || null;
      }
    }
  }

  onOptionClick(chosenOption: any, questionId: any) {
    let foundResult = this.currentAnswers.findIndex(
      (a, i) => a.questionId === questionId
    );
    if (foundResult === -1) {
      this.currentAnswers.push({
        questionId,
        chosenOption,
      });
    } else {
      this.currentAnswers[foundResult] = {
        questionId,
        chosenOption,
      };
    }
  }
  showModal(): void {
    this.radioValue = '';
    this.quizService.startTest().subscribe((response: any) => {
      this.currentTest = <Test>response['data'][0];
      this.currentQuestions = <Question[]>this.currentTest.questions;
      this.testStartTime = new Date().getTime();
      this.index = <Question>this.currentQuestions[0] || null;
      this.current = 0;
      this.isVisible = true;
    });
  }

  handleOk(): void {
    if(this.currentAnswers.length === 0){
      this.isVisible = false;
      return;
    }
    let timeNow = Date.now();
    this.isOkLoading = true;
    this.currentTest.startTime = this.testStartTime;
    this.currentTest.duration = timeNow - <any>this.testStartTime;
    this.currentTest.answers = this.currentAnswers;
    let submittedTestDTO: SubmittedTestDTO = {
      id: <Number>this.currentTest.id,
      duration: this.currentTest.duration,
      answers: this.currentTest.answers,
      startTime: this.testStartTime,
    };
    this.quizService.submitTest(submittedTestDTO).subscribe((response: any) => {
      this.quizService
        .getOverallStatistics()
        .subscribe((overallStatsResponse: any) => {
          let overallStatsResponseObject = overallStatsResponse.data[0];
          this.overallStats = {
            duration: overallStatsResponseObject.duration || 0,
            numberOfTests: overallStatsResponseObject.numberOfTests || 0,
            average: overallStatsResponseObject.average || 0,
          };
          this.getLatestTests(this.currentPage, this.currentSize)
          this.isVisible = false;
          this.isOkLoading = false;
        });
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  convertDate(timestamp: any) {
    return new Date(timestamp)
      .toLocaleString()
  }

  millisToMinutesAndSeconds(duration: any) {
    let minutes = Math.floor(duration / 60000);
    let seconds: any = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  getNumberInput(num: Number){
    return <NumberInput>num;
  }

  pageIndexChangeHandler(event: any){
    this.currentPage = event;
    this.getLatestTests(this.currentPage, this.currentSize);
  }

  pageSizeChangeHandler(event: any){
    this.currentSize = event;
    this.getLatestTests(this.currentPage, this.currentSize);
  }
}
