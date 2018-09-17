import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  errorMessage: String;
  isSubmited = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(true)
  });

  constructor(private commontService: CommonService, private router: Router) {
  }

  onFormSubmit() {
    this.isSubmited = true;
    let data = {
      "username": this.loginForm.get('username').value,
      "password": Md5.hashStr(this.loginForm.get('password').value),
      "remember": true
    }
    if (this.loginForm.valid) {
      this.commontService.login(data).subscribe(respone => {
        if (respone != null) {
          this.router.navigate(['/manage']);
        } else {
          this.errorMessage = "Tài khoản hoặc mật khẩu không đúng";
        }
      });
    }
  }
}


