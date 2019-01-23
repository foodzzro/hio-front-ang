import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";


@Component({
    selector: 'app-card-header-options',
    template: `
    <div class="card-options">
        <small *ngFor="let opt of options" (click)="optionClicked(opt)" className="text-muted" matTooltip="{{ 'admin.restaurant.card_options.' + opt | translate }}">
         <i class="fa fa-{{opt}} fa-lg"></i>
        </small>
    </div>
    `,
    styles: [
        `.card-options small {
            padding:7px;
        }`
    ]
}) 
export class CardHeaderOptionsComponent implements OnInit {

    @Input()
    options:any;

    @Output()
    clickedOpt:EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {}
    ngOnChanges() {}

    optionClicked(opt) {
        this.clickedOpt.emit(opt);
    }
} 