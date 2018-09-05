import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  active = '';

  onUpdateMaisonToActive() {
    this.active = '';
    console.log(this.active);
  }

  onUpdateHistoriqueToActive() {
    this.active = 'historique';
    console.log(this.active);
  }

  onUpdateAccountToActive() {
    this.active = 'account';
    console.log(this.active);
  }
}
