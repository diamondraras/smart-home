import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-passing',
  templateUrl: './passing.component.html',
  styleUrls: ['./passing.component.css']
})
export class PassingComponent implements OnInit {
  @Input() date: Date;
  @Input() dataUrl;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dataUrl = this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64, ${this.dataUrl}`);
  }

}
