import { Component, OnInit } from '@angular/core';
import { CustomerProfileService } from './customer.profile.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'customer.profile.component.html'
})
export class CustomerProfileComponent implements OnInit {
  errorMessage: String;
  isErrorMessage: Boolean;
  isSubmited = false;
  infoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('1', Validators.required)
  });
  customerProfile: any;
  isLogin:boolean =false;
  constructor(private customerProfileService: CustomerProfileService, private router: Router) { 
    router.routerState.root.queryParamMap.subscribe((data:any)=>{
      this.isLogin = data.params.isLogin!=null;
    })
  }
  ngOnInit(): void {
    this.customerProfileService.getProfile().subscribe((data: any) => {
      if (this.isLogin && data && data.phone) {
        this.router.navigate(['/homepage']);
      }
      if (data) {
        this.customerProfile = data;
        this.infoForm.get('name').setValue(data.name);
        this.infoForm.get('phone').setValue(data.phone);
        this.infoForm.get('gender').setValue(data.gender ? 1 : 0);
      }
    })
  }

  onFormSubmit() {
    this.errorMessage = "";
    this.isSubmited = true;
    let data = {
      "name": this.infoForm.get('name').value,
      "phone": this.infoForm.get('phone').value,
      "gender": this.infoForm.get('gender').value == 1,
    }

    if (this.infoForm.valid) {
      this.customerProfileService.udpate(data).subscribe(respone => {
        if (respone != null) {
          this.isErrorMessage = false;
          this.errorMessage = "Thông tin của bạn đã được cập nhật thành công.";
          this.ngOnInit();
        } else {
          this.errorMessage = "Có lỗi trong quá thực hiện. Vui lòng thử lại sau.";
          this.isErrorMessage = true;
        }
      });
    }
  }


}
