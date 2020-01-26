import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-modal',
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.scss']
})
export class TrailerModalComponent {
  @Input() url: string = null;

  safeSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    if (this.url) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

}
