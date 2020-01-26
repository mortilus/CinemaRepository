import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-modal',
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.scss']
})
export class TrailerModalComponent {
  @Input() url: string;

  constructor(public activeModal: NgbActiveModal) { }

}
