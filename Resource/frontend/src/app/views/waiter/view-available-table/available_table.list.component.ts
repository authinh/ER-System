import { OrderService } from './../../../service/order.service';
import { CommonService } from './../../../service/common.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AvailableTableService } from '../../../service/available_table.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TableServiceService } from '../../../service/table.service';
import { Table } from '../../../model/table';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication.service';
import { CustomerProfileService } from '../../customer-profile/customer.profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../../../service/shared.service';

@Component({
  styleUrls: ['../../../../scss/available_table.scss'
  ],
  templateUrl: 'available_table.list.component.html'
})
export class ViewAvailableTableComponent implements OnInit {
  page = new Page();
  @ViewChild('available_tableTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows = [];
  filterForm = new FormGroup({
    search: new FormControl(''),
    time: new FormControl(''),
    numberOfSeating: new FormControl('')
  });
  deleteRow: any = {};
  request: any = {};
  orderId: number;
  isStaff: boolean = false;
  phoneNumber: string;
  gender: string;
  loading: boolean;

  orderDTO: any = {
    "customer": {
      "fbid": "",
      "gender": true,
      "id": 1,
      "name": "",
      "phone": ""
    },
    "datetime": null,
    "note": "",
    "orderDetail": [
    ],
    "status": "ACTIVE",
    "tables": [
      {
        "id": 0,
        "name": "string",
        "note": "string",
        "numberOfSeating": 0
      }
    ],
    "user": null
  };
  value: Date = new Date();
  endCodeDateTime: string;
  selectedTables: any[] = [];
  availableTables: Table[] = [];
  inactiveTables: Table[] = [];
  pageSize: number;
  pageNumber: number[] = [];
  pages: number = 0;
  show: boolean = false;

  constructor(private modalService: BsModalService,
    private availableTableService: AvailableTableService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private tableService: TableServiceService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private customerProfileService: CustomerProfileService,
    private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    // this.setPage({ offset: 0 });

    this.spinner.show();
    setTimeout(() => {
      this.show = true;
      this.spinner.hide();
    }, 1000);
    this.getAvailableTable(0);

    this.authenticationService.getCustomerProfile().subscribe(data => {
      if (data == null) {
        this.isStaff = true;
        this.orderDTO.customer.fbid = 1;
        this.orderDTO.customer.id = 1;
        this.orderDTO.customer.name = 'Khách vãn lai';
        this.orderDTO.customer.gender = true;
        this.gender = 'Nam';
        this.orderDTO.customer.phone = '094667084';
      } else {
        this.orderDTO.customer.fbid = data.fbid;
        this.orderDTO.customer.id = data.id;
        this.orderDTO.customer.name = data.name;
        this.orderDTO.customer.gender = data.gender;
        this.orderDTO.customer.phone = data.phone;
      }
    });

    SharedService.foodStatusChange.subscribe(() => {
      this.tableService.getAvailableTable(this.endCodeDateTime, 0).subscribe(pagedData => {
        this.inactiveTables = [];
        pagedData.content.forEach(element => {
          if (element.status == "INACTIVE") {
            element.status = null;
            this.inactiveTables.push(element);
          }
        });
        this.pageSize = pagedData.totalPages;
        this.pageNumber = [];
        for (let i = 1; i <= this.pageSize; i++) {
          this.pageNumber.push(i);
        }
      });
    });

  }

  CheckProfile() {
    if(this.phoneNumber.trim() == "" || this.phoneNumber.trim() == null) {
      this.isStaff = true;
      this.orderDTO.customer.fbid = 1;
      this.orderDTO.customer.id = 1;
      this.orderDTO.customer.name = 'Khách vãn lai';
      this.orderDTO.customer.gender = true;
      this.gender = 'Nam';
      this.orderDTO.customer.phone = '094667084';
    } else  {
      this.customerProfileService.getProfileByPhone(this.phoneNumber).subscribe(data => {
        console.log('dataaaa ', data);
        this.orderDTO.customer = data;
        if (this.orderDTO.customer.gender == true) {
          this.gender = 'Nam';
        } else {
          this.gender = 'Nữ';
        }
      })
    }
  }

  onDateSelect(event) {

  }
  // setPage(pageInfo) {
  //   this.onSelect(this.value);
  //   this.request.page = pageInfo.offset;
  //   console.log('requestPage ', this.request.page);
  //   this.tableService.getAvailableTable(this.endCodeDateTime,this.request).subscribe(pagedData => {
  //     this.inactiveTables = [];
  //     pagedData.content.forEach(element => {
  //       if(element.status == "INACTIVE") {
  //         element.status = null;
  //         this.inactiveTables.push(element);
  //       }
  //     });

  //   });
  // }

  getAvailableTable(pageNum: number) {
    this.onSelect(this.value, pageNum);
    this.tableService.getAvailableTable(this.endCodeDateTime, pageNum).subscribe(pagedData => {
      this.inactiveTables = [];
      pagedData.content.forEach(element => {
        if (element.status == "INACTIVE") {
          element.status = null;
          this.inactiveTables.push(element);
        }
      });
      this.pageSize = pagedData.totalPages;
      this.pageNumber = [];
      for (let i = 1; i <= this.pageSize; i++) {
        this.pageNumber.push(i);
      }
    });
  }

  toggleExpandRow(row) {
    // this.table.rowDetail.toggleExpandRow(row);
  }

  openModal(rowtable: any) {

  }

  check(rowtable: any, event) {
    if (event == true) {
      this.selectedTables.push(rowtable);
    } else {
      for (let i = 0; i < this.selectedTables.length; i++) {
        if (rowtable.id == this.selectedTables[i].id) {
          this.selectedTables.splice(i, 1);
        }
      }
    }
    console.log('selectedTable ', this.selectedTables);
  }

  bookTable() {
    if (this.selectedTables.length == 0 || this.selectedTables.length == null) {
      this.toastr.error("Bạn cần chọn ít nhất 1 bàn");
      return;
    }
    this.orderDTO.tables = this.selectedTables;
    this.orderDTO.datetime = this.value;
    this.orderService.createOrders(this.orderDTO).subscribe(data => {
      this.toastr.success('book table successfully.');
      this.orderId = data.id;
      this.router.navigate(['/manage/order/' + this.orderId]);
    },
      error => {
        this.toastr.error(error.error.message);
        // this.setPage({ offset: 0 });
        this.getAvailableTable(0);
      }
    );
  }

  filterFormSubmit() {
    //this.request.search = this.filterForm.get('search').value;
    //this.setPage({ offset: 0 });
  }

  decline() {
    //this.modalRef.hide();
  }

  // confirm() {
  //   this.availableTableService.deleteAvailableTables(this.deleteRow.id)
  //     .subscribe(data => {
  //       this.toastr.success('The available_table deleted successfully.');
  //       this.modalRef.hide();
  //       this.setPage({ offset: this.request.page });
  //     },
  //       error => {
  //         this.toastr.error(error.error.message);
  //         this.modalRef.hide();
  //         this.setPage({ offset: this.request.page });
  //       }
  //     );
  // }

  onSelect(date: any, pageNum: number) {
    this.selectedTables = [];
    console.log('----------------------- ', this.selectedTables);
    if (this.value == undefined) {
      this.value = new Date();
    }
    this.endCodeDateTime = encodeURIComponent(date.toString());
    let now :any = new Date();
  //  console.log('aaaaa', Math.floor(this.value.getTime() / 60000) *60000);
  //  console.log('bbbbb', now.getTime() + 60000);
    if( (this.value.getTime()+60000) > (now.getTime()) ) {
      this.tableService.getAvailableTable(this.endCodeDateTime, pageNum).subscribe(
                    res => {
                      console.log("res:", res);
                      this.inactiveTables = [];
                      this.availableTables = res.content;
                      this.availableTables.forEach(table => {
                        if (table.status == "INACTIVE") {
                          table.status = null;
                          this.inactiveTables.push(table);
                        }
                      })
                    }
                  );
    } else {
      this.toastr.error("Không thể chọn thời điểm quá khứ");
      this.inactiveTables = [];
      return;
    }

    // if ( date.getYear() < now.getYear() || date.getMonth() < now.getMonth 
    // || date.getDate() < now.getDate() || a.getHours() < now.getHOurs() ){

    //   this.value = now;
    //   return;
    // }

    // if (this.compareDateTime(date.getYear(), now.getYear()) == false) {
    //   this.toastr.error("Không thể chọn thời điểm quá khứ");
    //   return;
    // }
    // if (this.compareDateTime(date.getYear(), now.getYear()) == true) {
    //   if (this.compareDateTime(date.getMonth(), now.getMonth()) == false) {
    //     this.toastr.error("Không thể chọn bàn vào thời điểm trong quá khứ");
    //     this.inactiveTables = [];
    //     return;
    //   }
    //   if (this.compareDateTime(date.getMonth(), now.getMonth()) == true) {
    //     if (this.compareDateTime(date.getDate(), now.getDate()) == false) {
    //       this.toastr.error("Không thể chọn bàn vào thời điểm trong quá khứ");
    //       this.inactiveTables = [];
    //       return;
    //     }
    //     if (this.compareDateTime(date.getDate(), now.getDate()) == true) {
    //       if (this.compareDateTime(date.getHours(), now.getHours()) == false) {
    //         this.toastr.error("Không thể chọn bàn vào thời điểm trong quá khứ");
    //         this.inactiveTables = [];
    //         return;
    //       }
    //       if (this.compareDateTime(date.getHours(), now.getHours()) == true) {
    //         if (this.compareDateTime(date.getMinutes(), now.getMinutes() ) == false) {
    //           console.log('++++++++++++++++++++++++++++++++++ ', this.selectedTables);
    //           this.toastr.error("Không thể chọn bàn vào thời điểm trong quá khứ");
    //           this.inactiveTables = [];
    //           return;
    //         }
    //         if (this.compareDateTime(date.getMinutes() + 0.5, now.getMinutes()) == true) {
    //           this.tableService.getAvailableTable(this.endCodeDateTime, pageNum).subscribe(
    //             res => {
    //               console.log("res:", res);
    //               this.inactiveTables = [];
    //               this.availableTables = res.content;
    //               this.availableTables.forEach(table => {
    //                 if (table.status == "INACTIVE") {
    //                   table.status = null;
    //                   this.inactiveTables.push(table);
    //                 }
    //               })
    //             }
    //           )
    //         }
    //       }
    //     }
    //   }
    // }
  }

  compareDateTime(a: any, b: any) {
    let numberA = Number.parseInt(a);
    let numberB = Number.parseInt(b);
    if (numberA  < numberB) {
      this.selectedTables = [];
      return false;
    } else {
      return true;
    }
  }

  getPage(item: number) {
    this.pages = item - 1;
    if (this.pages < 0) {
      this.pages = 0;
    }
    this.getAvailableTable(this.pages);
  }

  pagePlus() {
    this.pages++;
    if (this.pages > this.pageSize - 1) {
      this.pages = this.pageSize - 1;
    }
    this.getAvailableTable(this.pages);
  }

  pageDif() {
    this.pages--;
    this.getAvailableTable(this.pages);
  }
}
