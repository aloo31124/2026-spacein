import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Subject, timer } from 'rxjs';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { App } from '@capacitor/app';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';


@Injectable({
  providedIn: 'root'
})
export class RouteUrlRecordService<T> implements OnDestroy{

  private timeSubscription: Subscription = new Subscription();
  private backButtonListener?: PluginListenerHandle;
  private routeUrlChangeSubject = new Subject<string>();
  routerUrlChangeEmit = this.routeUrlChangeSubject.asObservable();

  routeUrlRecord: string[] = [];
  previousUrl = "";
  currentUrl = "";

  constructor(
    private location: Location,
    private router: Router,
    private dialogService: DialogService,
  ) { 
    if(Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('App')) {
      App.addListener('backButton', () => {
        this.backPage();
      }).then(listener => {
        this.backButtonListener = listener;
      });
    }

    // 每次初始時, 存取新的 路由路徑
    this.router.events.subscribe((event)=> {
      if (event instanceof NavigationEnd) {   
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.routeUrlRecord.push(event.url);

        // 其他頁面閒置過久, 退回首頁
        this.timeSubscription.unsubscribe();
        if(this.currentUrl !== "/home") {
          this.timeSubscription = timer(30 * 60 * 1000).subscribe(() => {
            alert("因閒置過久, 回到首頁");
            this.router.navigate(["/home"]);
          });
        }
      };
    });
  }

  /*
   * 上一個路由路徑
   */
  getPreviousUrl():string {
    return this.routeUrlRecord[this.routeUrlRecord.length -2];
  }

  /*
   * 當前路由路徑
   */
  getCurrentUrl():string {
    return this.routeUrlRecord[this.routeUrlRecord.length -1];
  }

  /*
   * 清除所有路徑 
   */
  cleanUrlRecord():void {
    this.routeUrlRecord = [];
  }

  /*
   * 下一頁 
   */
  nextPage(nextUrl: string, paramsObj: T) {
    // 將下一個 url 送給 header
    this.routeUrlChangeSubject.next(nextUrl);
    // 檢查當前頁面
    this.checkRouteUrl(this.getCurrentUrl());
    // 導向下一頁
    if(paramsObj) {
      this.router.navigate([nextUrl], {queryParams: {...paramsObj}});
    } else {
      this.router.navigate([nextUrl]);
    }
  }

  /*
   * 上一頁 
   */
  async backPage() {
    const currentUrl = this.getCurrentUrl();

    // 最初始畫面, 離開 app
    if(currentUrl === "/home" || currentUrl === "/" || !currentUrl) {
      this.confirmExitApp();
      return;
    }

    // 管理畫面, 直接退回首頁
    if(currentUrl.includes("manager")) {
      this.router.navigate(["/home"]);
      return;
    }

    const previousUrl = this.getPreviousUrl() || "/home";
    // 問號參數的攜帶需處理
    if(previousUrl.includes("?")) {
      this.location.back();
    }
    this.routeUrlRecord.pop();
    this.routeUrlRecord.pop();
    this.router.navigate([previousUrl]);
  }

  /*
   * 確認離開 App
   */
  private async confirmExitApp() {
    const isConfirmExitApp = await this.dialogService.confirm("確定離開 App?");

    if(!isConfirmExitApp) {
      return;
    }

    if(Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('App')) {
      App.exitApp().catch(() => window.close());
      return;
    }

    window.close();
  }

  /*
   * 檢查該路徑是否有可 [上一頁]
   * post, delete "後", 清除該路徑, 不能回到 post, delete頁面, 避免重複動作 
   */
  checkRouteUrl(checkUrl: string) {
    if(!checkUrl) {
      return;
    }
    if(checkUrl.includes("booking-check-form") || checkUrl.includes("review-booking-form")) {
      this.cleanUrlRecord();
      this.routeUrlRecord.push("/");
      this.routeUrlRecord.push("/home");
    }
  }

  /*
   * 元件銷毀, 取消監聽 
   */
  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
    this.backButtonListener?.remove();
  }

}
