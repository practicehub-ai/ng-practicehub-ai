import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() name: any;
  @Input() modalTitle: any;
  @Input() modalBody: any;

  constructor(public activeModal: NgbActiveModal) { }


}




