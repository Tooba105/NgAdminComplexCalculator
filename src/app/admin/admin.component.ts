import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './admin.service';
import { ScoreBoardGrid, ScoreBoardTotal, TotalScoreBoradModelResponse } from '../core/models/TotalScoreBoradModelResponse';
import { Observable } from 'rxjs/internal/Observable';
import { map, of, startWith } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  private readonly _adminService = inject(AdminService);
  adminForm = new FormGroup({
    groupNo: new FormControl<number | null>(null, [Validators.required]),
    tipMode: new FormControl<number | null>(5000, [Validators.required])
  });
  defaultScoreBoardTotal: ScoreBoardTotal = new ScoreBoardTotal();
   // Initialize with an empty/default observable
adminData$!: Observable<TotalScoreBoradModelResponse>;

  scoreBoardTotal$!: Observable<ScoreBoardTotal>;
  lstScoreBoardGrid$!: Observable<ScoreBoardGrid[]>;


  ngOnInit(): void {
    this.adminData$ = of({
  lstScoreBoardGrid: [],
  scoreBoardTotal: this.defaultScoreBoardTotal
});

    this.scoreBoardTotal$ = this.adminData$.pipe(
      map(data => data.scoreBoardTotal ?? this.defaultScoreBoardTotal),
      startWith(this.defaultScoreBoardTotal) // emit immediately on subscribe
    );
  }



getAdminData() {
  if (this.adminForm.valid) {
    const tipMode = this.adminForm.get('tipMode')?.value as number;
    const groupNo = this.adminForm.get('groupNo')?.value as number;

    this.adminData$ = this._adminService
      .GetDataTotalScoreBoardByGroupNoAndTipMode(groupNo, tipMode)
      .pipe(startWith({
        lstScoreBoardGrid: [],
        scoreBoardTotal: this.defaultScoreBoardTotal
      }));

    this.scoreBoardTotal$ = this.adminData$.pipe(
      map(data => data.scoreBoardTotal ?? this.defaultScoreBoardTotal),
      startWith(this.defaultScoreBoardTotal)
    );
    this.lstScoreBoardGrid$=this.adminData$.pipe(map(data=>data.lstScoreBoardGrid??[]))
  }
}



}



