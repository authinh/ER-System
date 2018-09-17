import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  templateUrl: 'user.editor.component.html'
})
export class UserEditorComponent implements OnInit {
  isSubmited: boolean = false;
  userId: number = Number.NaN;
  editorForm = new FormGroup({
    username: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repassword: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl(4),
    status: new FormControl('ACTIVE')
  });
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.userId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(this.userId)) {
      this.userService.getUser(this.userId).subscribe(data => {
        this.editorForm.get('username').disable();
        this.editorForm.get('username').setValue(data.username);
        this.editorForm.get('fullname').setValue(data.fullname);
        this.editorForm.get('phone').setValue(data.phone);
        this.editorForm.get('address').setValue(data.address);
        this.editorForm.get('role').setValue(data.role.id);
        this.editorForm.get('status').setValue(data.status);
      });
    }
  }

  editorFormSubmit() {
    this.isSubmited = true;
    let data = {
      username: this.editorForm.get('username').value,
      password: this.editorForm.get('password').value,
      fullname: this.editorForm.get('fullname').value,
      phone: this.editorForm.get('phone').value,
      address: this.editorForm.get('address').value,
      roleId: this.editorForm.get('role').value,
      status: this.editorForm.get('status').value,
    }
    if (!this.validateByRegex(data.username, '^[a-zA-Z0-9_-]{3,100}$')) {
      this.editorForm.get('username').setErrors({ message: 'Tài khoản không đúng định dạng' })
    }
    if (data.password != this.editorForm.get('repassword').value) {
      this.editorForm.get('repassword').setErrors({ message: 'Mật khẩu không trùng nhau' })
    }
   if (Number.isNaN(this.userId)) {
      if (this.validateByRegex(data.password, '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,10}$')) {
        this.editorForm.get('password').setErrors({ message: 'Mật khẩu không đúng định dạng' })
      }
      if (data.password != this.editorForm.get('repassword').value) {
        this.editorForm.get('repassword').setErrors({ message: 'Mật khẩu không trùng nhau' })
      }
   }
    if (!this.validateByRegex(data.fullname, '^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*){3,255}')) {
      this.editorForm.get('fullname').setErrors({ message: 'Họ và tên không đúng định dạng' })
    }
    if (!this.validateByRegex(data.phone, '^\\+?\\d{1,3}?[- .]?\\(?(?:\\d{2,3})\\)?[- .]?\\d\\d\\d[- .]?\\d\\d\\d\\d$')) {
      this.editorForm.get('phone').setErrors({ message: 'Số điện thoại không đúng định dạng' })
    }
    if (this.editorForm.valid) {
      if((data.password||'').trim().length>0){
        data.password = Md5.hashStr(data.password);
      }
      if (Number.isNaN(this.userId)) {
        this.userService.createUsers(data).subscribe(
          data => {
            this.toastr.success('Tạo nhân viên thành công.');
            this.router.navigate(['/manage/user']);
          },
          error => {
            this.toastr.error(error.error.message);
          }
        )
      } else {
        console.log('in in in in in ');
        this.userService.updateUsers(this.userId, data).subscribe(
          data => {
            this.toastr.success('Nhân viên đã được sửa thành công.');
            this.router.navigate(['/manage/user']);
          },
          error => {
            this.toastr.error(error.error.message);
          }
        )
      }
    }
  }

  validateByRegex(string: string, patterns: string) {
    let pattern = new RegExp(patterns);
    return pattern.test(string);
  }
}
