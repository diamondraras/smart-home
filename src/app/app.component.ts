import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

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
}
