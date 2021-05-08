import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OverallStatistics, Response} from '../models';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiURL: String = 'https://buuk-backend.herokuapp.com';
  constructor(private http: HttpClient) { }

  getOverallStatistics(){
    return this.http.get<Observable<Response<OverallStatistics>>>(`${this.apiURL}/overall-stats`)
  }

}
