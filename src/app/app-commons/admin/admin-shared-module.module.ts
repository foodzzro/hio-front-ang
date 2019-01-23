import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DecisionDialogComponent } from "./modals/decision-dialog/decision-dialog.component";
import {MatListModule} from '@angular/material/list';
import { BackgroundImageDirective } from "../directives/background-image.directive";
import {MatTooltipModule} from '@angular/material/tooltip';
import { CardHeaderOptionsComponent } from "./components/card-header-options.component";
import { FormErrorMessageDirective } from "./directives/form-error-message.directive";

@NgModule({
    declarations: [
        DecisionDialogComponent,
        BackgroundImageDirective,
        CardHeaderOptionsComponent,
        FormErrorMessageDirective
    ],
    imports: [
        CommonModule,
        TranslateModule,
        CollapseModule.forRoot(),
        TabsModule.forRoot(),
        NgxSmartModalModule.forRoot(),
        FormsModule, ReactiveFormsModule,
        
        MatListModule,
        MatTooltipModule
    ],
    exports: [
        CommonModule,
        TranslateModule,
        CollapseModule,
        TabsModule,  
        NgxSmartModalModule,
        FormsModule, ReactiveFormsModule,

        MatListModule,
        MatTooltipModule,

        DecisionDialogComponent,
        BackgroundImageDirective,
        CardHeaderOptionsComponent,
        FormErrorMessageDirective
    ]
})
export class AdminSharedModulesModule {}
 