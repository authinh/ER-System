import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TableBookingService } from '../../../service/table_booking.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { isoStringToDate } from '@angular/common/src/i18n/format_date';
import { AuthenticationService } from '../../../service/authentication.service';
import { OrderService } from '../../../service/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../../../service/shared.service';

@Component({
  templateUrl: 'table_booking.list.component.html'
})
export class ManageTableBookingListComponent implements OnInit {
  page = new Page();
  @ViewChild('table_bookingTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows = [];
  filterForm = new FormGroup({
    search: new FormControl(''),
    role: new FormControl(-1),
    status: new FormControl(-1)
  });
  deleteRow: any = {};
  request: any = {};
  role: String = localStorage.getItem("role");
  phoneNumber: string;
  rowStatus: number = 1;
  show: boolean = false;
  isStaff: boolean = false;
  

  constructor(private modalService: BsModalService,
    private tableBookingService: TableBookingService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.show = true;
     this.spinner.hide();
 }, 1000);

 this.authenticationService.getCustomerProfile().subscribe(data => {
  if (data == null) {
    this.isStaff = true;
  } else {
    this.isStaff = false;
  }
});
 SharedService.foodStatusChange.subscribe(() => {
  this.setPage({ offset: 0 });
});
    this.setPage({ offset: 0 });

  }

  setPage(pageInfo) {
    this.request.page = pageInfo.offset;
    console.log('this request ', this.request);
    if(this.rowStatus == 1) {
      this.tableBookingService.getTableBooking(this.request).subscribe(pagedData => {
        console.log('in in in in ', pagedData);
        this.rowStatus = 1;
        this.page.totalElements = pagedData.totalElements;
        this.page.pageNumber = pagedData.number;
        this.page.size = pagedData.size;
        this.rows = pagedData.content;
        this.rows.forEach(row => {
          row.datetime = new Date(row.datetime);
        })
      });
    } else if(this.rowStatus = 2) {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      this.getOrdersByPhone();
    }
  }

  getOrdersByPhone() {
    if (this.phoneNumber.trim() == '' || this.phoneNumber.trim() == null) {
      this.rowStatus = 1;
      this.setPage({ offset: 0 });
    } else {
      this.rowStatus = 2;
      this.orderService.getOrdersByPhone(this.phoneNumber, this.request).subscribe(
        data => {
          this.rowStatus = 2;
          this.page.totalElements = data.totalElements;
          this.page.pageNumber = data.number;
          this.page.size = data.size;
          this.rows = data.content;
        }
      )
    }
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
    this.tableBookingService.deleteTableBookings(this.deleteRow.id)
      .subscribe(data => {
        this.toastr.success('hủy bàn thành công');
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
