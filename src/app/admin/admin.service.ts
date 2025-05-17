import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TotalScoreBoradModelResponse } from '../core/models/TotalScoreBoradModelResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly _adminnUrl = `${environment.baseUrl}/Admin/GetDataTotalScoreBoardByGroupNoAndTipMode`;

  constructor(private http:HttpClient) { }
// Example: Get single user by ID
  GetDataTotalScoreBoardByGroupNoAndTipMode(groupNo: number, tipMode:number): Observable<TotalScoreBoradModelResponse> {
    return this.http.get<TotalScoreBoradModelResponse>(`${this._adminnUrl}?groupNo=${groupNo}&tipMode=${tipMode}`);
  }
}
