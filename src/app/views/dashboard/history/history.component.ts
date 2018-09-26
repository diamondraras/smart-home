import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromDashboard from '../dashboard.reducer';

import { Entry } from '../../../shared/models/entry.model';
import { Passing } from '../../../shared/models/passing.model';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { removeSummaryDuplicates } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  filter = 'entry';
  newEntries;
  entries$: Observable<Entry[]>;
  passing$: Observable<Passing[]>;

  constructor(
    private store: Store<fromDashboard.State>,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.entries$ = this.store.select(fromDashboard.getEntries);
    this.passing$ = this.store.select(fromDashboard.getPassing);
  }

  sort(value: string) {
    if (value !== null && value !== '') {
      this.entries$ = this.store
        .select(fromDashboard.getEntries)
        .pipe(
          map((entries: Entry[]) =>
            entries.filter(
              (entry: Entry) => new Date(entry.date) >= new Date(value)
            )
          )
        );
      this.passing$ = this.store
        .select(fromDashboard.getPassing)
        .pipe(
          map((passings: Passing[]) =>
            passings.filter(
              (passing: Passing) => new Date(passing.date) >= new Date(value)
            )
          )
        );
    } else {
      this.entries$ = this.store.select(fromDashboard.getEntries);
      this.passing$ = this.store.select(fromDashboard.getPassing);
    }
  }
}
