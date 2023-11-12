import { Component, 
  ElementRef,
  EventEmitter,
  Input,
  Output } from '@angular/core';
//import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() size? = 'md';
  @Input() title? = 'Modal title';
  @Input() value? = 'Modal value';
  

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

 

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
  

}
