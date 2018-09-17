import { Component, OnInit, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Page } from '../../model/page';
import { OrderService } from '../../service/order.service';
import { SharedService } from '../../service/shared.service';

@Component({
  templateUrl: './cashier.component.html'
})export class CashierComponent implements OnInit {

  @ViewChild('orderTable') table: any;
  page = new Page();
  rows = [];

  filterForm = new FormGroup({
    search: new FormControl('')
  });
  request: any = {}

  constructor( 
    private modalService: BsModalService, 
  	private orderService: OrderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    SharedService.foodStatusChange.subscribe(() => {
      this.setPage({ offset: 0 });
    });

    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    let search = this.filterForm.get('search').value;
    this.request.page = pageInfo.offset;
    this.orderService.getOrders({
    	"search": search, 
    	"status": 3, 
    	"page": this.request.page,
      "size": 9
    }).subscribe(pageData => {
      this.page.totalElements = pageData.totalElements;
      this.page.pageNumber = pageData.number;
      this.page.size = pageData.size;
      this.rows = pageData.content;
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  
  filterFormSubmit(){
    this.setPage({ offset: 0 });
  }
}
