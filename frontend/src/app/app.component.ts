import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDialogState, DialogService } from './common/dialog/services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Space In';
  dialogState: AppDialogState;
  private dialogSub: Subscription;

  constructor(public dialogService: DialogService) {
    this.dialogState = {
      isVisible: false,
      type: 'alert',
      message: '',
      isFlash: false,
    };
    this.dialogService.installWindowAlert();
    this.dialogSub = this.dialogService.dialog$.subscribe(state => {
      this.dialogState = state;
    });
  }

  ngOnDestroy(): void {
    this.dialogSub.unsubscribe();
  }
}
