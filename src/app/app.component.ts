import { Component, Renderer2, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private renderer: Renderer2,
    private store: Store<fromRoot.State>,
    private router: Router
    ) {}

  isFavorite = false;
  showBoring = false;
  courseGoals = [
    { title: 'Master Angular Styling', isActiveGoal: true},
    { title: 'Understand Angular Animations', isActiveGoal: false},
    { title: 'Master Angular Animations', isActiveGoal: false},
  ];

  onShowBoring(element: HTMLElement) {
    // element.style.display = 'block';
    this.renderer.setStyle(element, 'display', 'block');
  }

  ngOnInit() {
    this.store.select(fromRoot.getIsAuth)
                    .pipe(take(1))
                    .subscribe((state) => {
                      if (state) {
                        this.router.navigate(['/dashboard']);
                      } else {
                        this.router.navigate(['login']);
                      }
                    });
  }
}
