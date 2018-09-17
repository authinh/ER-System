import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'user.list.component.html'
})
export class UserListComponent implements OnInit {
  page = new Page();
  @ViewChild('userTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows = [];
  filterForm = new FormGroup({
    search: new FormControl(''),
    role: new FormControl(-1),
    status: new FormControl(-1)
  });
  deleteRow: any = {};
  request: any = {}
  constructor(private modalService: BsModalService, private userService: UserService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.request.page = pageInfo.offset;
    this.userService.getUsers(this.request).subscribe(pagedData => {
      this.page.totalElements = pagedData.totalElements;
      this.page.pageNumber = pagedData.number;
      this.page.size = pagedData.size;
      this.rows = pagedData.content;
      if(pagedData.number >= pagedData.totalPages) {
        this.setPage({ offset: 0 });
      }
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  openModal(row: any) {
    this.deleteRow = row;
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  filterFormSubmit() {
    this.request.search = this.filterForm.get('search').value;
    this.request.status = this.filterForm.get('status').value;
    this.request.role = this.filterForm.get('role').value;
    this.setPage({ offset: 0 });
  }

  decline() {
    this.modalRef.hide();
  }

  confirm() {
    this.userService.deleteUsers(this.deleteRow.id)
      .subscribe(data => {
        this.toastr.success('Xóa thành công.');
        this.modalRef.hide();
        this.setPage({ offset: this.request.page });
      },
        error => {
          this.toastr.error(error.error.message);
          this.modalRef.hide();
          this.setPage({ offset: this.request.page });
        }
      );
  }
}
