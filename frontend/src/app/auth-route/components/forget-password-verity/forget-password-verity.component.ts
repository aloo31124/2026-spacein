import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { ActivatedRoute } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';

@Component({
  selector: 'app-forget-password-verity',
  templateUrl: './forget-password-verity.component.html',
  styleUrls: ['./forget-password-verity.component.scss']
})
export class ForgetPasswordVerityComponent {

  verifyCode: string = "";
  mail: string = "";

  constructor(
    private registerService: RegisterService,
    private activatedRoute: ActivatedRoute,
    private routeUrlRecordService: RouteUrlRecordService<{}>,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mail = params['mail'];
      alert(this.mail);
    });
  }

  sendCode() {
    if(this.verifyCode.trim() === "") {
      alert("請輸入驗證碼");
    }

    this.registerService.sendCode(this.mail, this.verifyCode)
      .subscribe(
        res => {
          //alert("驗證成功" + res.verifyResult);
          if(res.verifyResult) {
            alert("驗證成功");
            this.routeUrlRecordService.nextPage("password-change", {mail: this.mail});
          } else {
            alert("驗證錯誤: " + res.verifyResult);
          }
        },
        err => {
          alert("驗證失敗");
        }
      );
  }

}
