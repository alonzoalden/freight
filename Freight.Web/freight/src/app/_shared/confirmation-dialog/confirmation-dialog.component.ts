import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any>;
    password: string = null;
    isLoading: boolean = false;
    @ViewChild('passwordInput') passwordInput: ElementRef;
    constructor(
        public matDialogRef: MatDialogRef<ConfirmationDialogComponent>,
        private notifyService: NotificationsService,
        private confirmationDialogService: ConfirmationDialogService,
        @Inject(MAT_DIALOG_DATA) public _data: any,
    ) {
        // Set the defaults
        this._unsubscribeAll = new Subject();
    }
    
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.password = '';
    }
    confirm() {
        if (this._data.password) {
            this.isLoading = true;
            this.confirmationDialogService.checkManagerCode(this.password)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    (result: boolean) => {
                        if (result) {
                            this.notifyService.success('Success', `Password accepted`, {timeOut: 2500, clickToClose: true });
                            this.matDialogRef.close(true);
                        }
                        else {
                            this.onPasswordIncorrect();
                        }
                        this.isLoading = false;
                    },
                    err => {
                        this.onPasswordIncorrect();
                    }
                );
        }
        else {
            this.matDialogRef.close(true);
        }

    }
    onPasswordIncorrect() {
        this.password = '';
        this.notifyService.error('Password Incorrect', `Please try again`, {timeOut: 2500, clickToClose: true });
        this.isLoading = false;
        setTimeout(() => this.passwordInput.nativeElement.focus(), 10)
    }
}
