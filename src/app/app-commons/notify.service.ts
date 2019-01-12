import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotifyService {
    config = {
        timeOut: 5000,
        progressBar: true
    };
    constructor(private toastr: ToastrService, private translate: TranslateService) {

    }

    success(translationKey) {
        this.translate.get(translationKey).subscribe((translatedMessage: string) => {
            this.toastr.success('', translatedMessage, this.config);
        });
    }

    successMessage(message) {
        this.toastr.success('', message);
    }

    error(translationKey) {
        this.translate.get(translationKey).subscribe((translatedMessage: string) => {
            this.toastr.error('', translatedMessage, this.config);
        });
    }

    errorMessage(message) {
        this.toastr.error('', message);
    }

    info(translationKey) {
        this.translate.get(translationKey).subscribe((translatedMessage: string) => {
            this.toastr.info('', translatedMessage, this.config);
        });
    }

    warning(translationKey) {
        this.translate.get(translationKey).subscribe((translatedMessage: string) => {
            this.toastr.warning('', translatedMessage, this.config);
        });
    }

    warningMessage(message) {
        this.toastr.warning('', message);
    }


    clear() {
        this.toastr.clear();
    }
}