import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DataPerRoundSum, TotalScoreBoradModelResponse } from '../core/models/TotalScoreBoradModelResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly _adminnUrl = `${environment.baseUrl}/Admin/GetDataTotalScoreBoardByGroupNoAndTipMode`;
  private readonly _urlGetAllThreadByGroupNo = `${environment.baseUrl}/Calculator/GetAllEndThreadByGroupNo`;
  private readonly _urlGetDataPerRoundByGroupNoAndTipMode = `${environment.baseUrl}/Admin/GetDataPerRoundByGroupNoAndTipMode`;
 //private string urlGetAllGetAllByEndThread = $"{ApiConfig.BaseUrl}/api/Calculator/GetAllEndThreadByGroupNo?groupNo=";
  constructor(private http:HttpClient) { }
// Example: Get single user by ID
  GetDataTotalScoreBoardByGroupNoAndTipMode(groupNo: number, tipMode:number): Observable<TotalScoreBoradModelResponse> {
    return this.http.get<TotalScoreBoradModelResponse>(`${this._adminnUrl}?groupNo=${groupNo}&tipMode=${tipMode}`);
  }
  GetAllEndThreadByGroupNo(groupNo: number): Observable<TotalScoreBoradModelResponse> {
    return this.http.get<TotalScoreBoradModelResponse>(`${this._urlGetAllThreadByGroupNo}?groupNo=${groupNo}`);
  }
  GetDataPerRoundByGroupNoAndTipMode(groupNo: number, tipMode:number=5000): Observable<DataPerRoundSum[]> {
    return this.http.get<DataPerRoundSum[]>(`${this._urlGetDataPerRoundByGroupNoAndTipMode}?groupNo=${groupNo}&tipMode=${tipMode}`);
  }
}
