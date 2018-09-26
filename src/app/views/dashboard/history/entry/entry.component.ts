import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() name: string;
  @Input() date: Date;
  @Input() dataUrl;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dataUrl = this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64, ${this.dataUrl}`);
  }

}
