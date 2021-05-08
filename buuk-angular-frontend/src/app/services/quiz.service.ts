import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverallStatistics, Response, SubmittedTestDTO, Test } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiURL: String = 'https://buuk-backend.herokuapp.com';
  constructor(private http: HttpClient) { }

  startTest(){
    return this.http.get<Observable<Response<Test>>>(`${this.apiURL}/start-test`)
  }

  submitTest(submittedTestDTO: SubmittedTestDTO){
    return this.http.post(`${this.apiURL}/submit-test`, submittedTestDTO)
  }

  getOverallStatistics(){
    return this.http.get<Observable<Response<OverallStatistics>>>(`${this.apiURL}/overall-stats`)
  }

  getTests(page: number = 0, limit: number = 10){
    return this.http.get<Observable<Response<Test>>>(`${this.apiURL}/tests?page=${page}&limit=${limit}`)
  }
}
