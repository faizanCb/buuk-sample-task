import { Component, OnInit } from '@angular/core';
import { OverallStatistics } from './models';
import { QuizService } from './services/quiz.service';
import { NumberInput } from 'ng-zorro-antd/core/types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'buuk-angular-frontend';
  overallStats: OverallStatistics = {
    duration: 0,
    average: 0,
    numberOfTests: 0,
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
      });
  }

  getNumberInput(num: Number){
    return <NumberInput>num;
  }

  millisToMinutesAndSeconds(duration: any) {
    let minutes = Math.floor(duration / 60000);
    let seconds: any = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}
