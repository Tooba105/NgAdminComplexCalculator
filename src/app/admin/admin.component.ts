import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './admin.service';
import { DataPerRoundSum, ScoreBoardGrid, ScoreBoardTotal, TotalScoreBoradModelResponse } from '../core/models/TotalScoreBoradModelResponse';
import { Observable } from 'rxjs/internal/Observable';
import { map, of, shareReplay, startWith } from 'rxjs';
import { NumberColorPipe } from '../core/pipes/number-color.pipe';


@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule, NumberColorPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  private readonly _adminService = inject(AdminService);
  adminForm = new FormGroup({
    groupNo: new FormControl('', [Validators.required]),
    tipMode: new FormControl(5000, [Validators.required])
  });
  defaultScoreBoardTotal: ScoreBoardTotal = new ScoreBoardTotal();
  // Initialize with an empty/default observable
  adminData$!: Observable<TotalScoreBoradModelResponse>;

  scoreBoardTotal$!: Observable<ScoreBoardTotal>;
  lstScoreBoardGrid$!: Observable<ScoreBoardGrid[]>;
  lstDataPerRoundSum$!: Observable<DataPerRoundSum[]>;


  ngOnInit(): void {
    let groupNo = (localStorage.getItem('groupNo'));
    this.adminForm.setValue({ groupNo: groupNo, tipMode: 5000 })
    this.adminData$ = of({
      lstScoreBoardGrid: [],
      scoreBoardTotal: this.defaultScoreBoardTotal
    });

    this.scoreBoardTotal$ = this.adminData$.pipe(
      map(data => data.scoreBoardTotal ?? this.defaultScoreBoardTotal),
      startWith(this.defaultScoreBoardTotal) // emit immediately on subscribe
    );
    //this.getAdminData();
  }
  onChangeGroupNo(event:Event){
console.log(this.adminForm)
  }

getAdminData() {
  if (this.adminForm.valid) {
    const tipMode = this.adminForm.get('tipMode')?.value;
    const groupNo = this.adminForm.get('groupNo')?.value;
    localStorage.setItem('groupNo', groupNo??'');

    // Cache the API result
    this.adminData$ = this._adminService
      .GetDataTotalScoreBoardByGroupNoAndTipMode(Number(groupNo), Number(tipMode))
      .pipe(
        startWith({
          lstScoreBoardGrid: [],
          scoreBoardTotal: this.defaultScoreBoardTotal
        }),
        shareReplay(1) // prevents multiple API calls
      );

    this.scoreBoardTotal$ = this.adminData$.pipe(
      map(data => data.scoreBoardTotal ?? this.defaultScoreBoardTotal),
      startWith(this.defaultScoreBoardTotal)
    );

    this.lstScoreBoardGrid$ = this.adminData$.pipe(
      map(data => data.lstScoreBoardGrid ?? [])
    );

    this.lstDataPerRoundSum$ = this._adminService
      .GetDataPerRoundByGroupNoAndTipMode(Number(groupNo), Number(tipMode))
      .pipe(map(data => data ?? []));
  }
}

}