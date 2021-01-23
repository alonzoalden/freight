import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    template: `
        <div class="blank-white-page-centered" style="padding-bottom: 20rem;">
            <div class="p-24">
                <h1 class="big-title">Password Assistance</h1>
                
                <div>We sent a reset password email to xxxx@xxxx.com.</div>
                <div>Please click the reset password link to set your new password.</div>
                <div class="mt-24">Haven't received the email yet?</div>
                <div >Please check your spam folder or <a>try again</a>.</div>
            </div>
        </div>
    `
})

export class PasswordAssistanceComponent {
    constructor(
        private _fuseConfigService: FuseConfigService,
    ) {
        this._fuseConfigService.config = this._fuseConfigService.hideLayoutConfig();
    }
}
