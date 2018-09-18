import { Component, Renderer2, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private renderer: Renderer2,
    private authService: AuthService
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
    this.authService.initAuthListener();
  }
}
