import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppDialogType = 'alert' | 'confirm';

export interface AppDialogState {
  isVisible: boolean;
  type: AppDialogType;
  message: string;
  isFlash: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly defaultState: AppDialogState = {
    isVisible: false,
    type: 'alert',
    message: '',
    isFlash: false,
  };

  private readonly dialogSubject = new BehaviorSubject<AppDialogState>(this.defaultState);
  dialog$ = this.dialogSubject.asObservable();

  private confirmResolver?: (isConfirm: boolean) => void;
  private flashTimer?: ReturnType<typeof setTimeout>;
  private isWindowAlertInstalled = false;
  private nativeAlert?: typeof window.alert;

  constructor(private ngZone: NgZone) {}

  installWindowAlert(): void {
    if (this.isWindowAlertInstalled) {
      return;
    }

    this.nativeAlert = window.alert.bind(window);
    window.alert = (message?: any): void => {
      this.ngZone.run(() => {
        this.alert(String(message ?? ''));
      });
    };
    this.isWindowAlertInstalled = true;
  }

  alert(message: string): void {
    const isFlash = this.isFlashMessage(message);
    this.clearFlashTimer();
    this.dialogSubject.next({
      isVisible: true,
      type: 'alert',
      message,
      isFlash,
    });

    if (isFlash) {
      this.flashTimer = setTimeout(() => {
        this.ngZone.run(() => this.close());
      }, 1600);
    }
  }

  confirm(message: string): Promise<boolean> {
    this.clearFlashTimer();
    this.resolveConfirm(false);
    this.dialogSubject.next({
      isVisible: true,
      type: 'confirm',
      message,
      isFlash: false,
    });

    return new Promise<boolean>(resolve => {
      this.confirmResolver = resolve;
    });
  }

  confirmYes(): void {
    this.resolveConfirm(true);
    this.close();
  }

  confirmNo(): void {
    this.resolveConfirm(false);
    this.close();
  }

  close(): void {
    this.clearFlashTimer();
    this.dialogSubject.next(this.defaultState);
  }

  private resolveConfirm(isConfirm: boolean): void {
    if (!this.confirmResolver) {
      return;
    }
    this.confirmResolver(isConfirm);
    this.confirmResolver = undefined;
  }

  private clearFlashTimer(): void {
    if (!this.flashTimer) {
      return;
    }
    clearTimeout(this.flashTimer);
    this.flashTimer = undefined;
  }

  private isFlashMessage(message: string): boolean {
    return message.includes('請先登入')
      || message.includes('登入成功')
      || message.includes('成功登入');
  }
}
