import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromDashboard from '../dashboard.reducer';

import { Entry } from '../../../shared/models/entry.model';
import { Passing } from '../../../shared/models/passing.model';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { removeSummaryDuplicates } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  filter = 'entry';
  entries$: Observable<Entry[]>;
  passing$: Observable<Passing[]>;

  constructor(private store: Store<fromDashboard.State>, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.entries$ = this.store.select(fromDashboard.getEntries);
    this.passing$ = this.store.select(fromDashboard.getPassing);
  }

  show(b64string: string) {
    console.log(this.domSanitizer.bypassSecurityTrustUrl(b64string));
  }
}
