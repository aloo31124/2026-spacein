import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { ActivatedRoute } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  password: string = "";
  passwordConfirm: string = "";
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

  clickChangePassword() {
    if(this.password.trim() === "") {
      alert("請輸入密碼");
      return;
    }

    this.registerService.changePassword(this.mail, this.password)
      .subscribe(
        res => {
          alert("密碼修改成功");
          this.routeUrlRecordService.nextPage("/", {});
        },
        err => {
          alert("密碼修改失敗");
        }
      );
  }

}
