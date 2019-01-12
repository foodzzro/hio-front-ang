import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DecisionDialogComponent } from "./modals/decision-dialog/decision-dialog.component";

@NgModule({
    declarations: [
        DecisionDialogComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        CollapseModule.forRoot(),
        TabsModule.forRoot(),
        NgxSmartModalModule.forRoot(),
        FormsModule, ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        TranslateModule,
        CollapseModule,
        TabsModule,  
        NgxSmartModalModule,
        FormsModule, ReactiveFormsModule,
        DecisionDialogComponent
    ]

})
export class SharedModulesModule {}
 