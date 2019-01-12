import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-decision-dialog',
  templateUrl: './decision-dialog.component.html',
  styleUrls: ['./decision-dialog.component.css']
})
export class DecisionDialogComponent implements OnInit {

  @Input() control:any;
  @Output() confirm = new EventEmitter<any>();

  message:string = "";

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
  ) { }

  ngOnInit() {
    //this.message = "app.do-you-want-delete";
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(changes && changes.control.currentValue.decisionMessage && !changes.control.currentValue.closeDecision) {
      this.message = changes.control.currentValue.decisionMessage;
      this.ngxSmartModalService.getModal("decisionModal").open();       
        
    } else if(changes.control.currentValue.closeDecision) {
      this.ngxSmartModalService.getModal("decisionModal").close();   
    }
  }

  doConfirm(opt) {
    this.confirm.emit(opt);
  }

}
