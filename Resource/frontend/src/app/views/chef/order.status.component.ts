import { Component, OnInit, OnChanges, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Food } from '../../model/food';
import { OrderService } from '../../service/order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { Page } from '../../model/page';
import { SharedService } from '../../service/shared.service';
import { AuthenticationService } from '../../service/authentication.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './order.status.component.html'
}) export class OrderStatusComponent implements OnInit {

  @ViewChild('foodTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  rows = [];
  role: string;
  foodName: string;
  modalRef: BsModalRef;
  row: any;
  status: number;

  constructor(private modalService: BsModalService,
    private orderService: OrderService,
    private ref: ChangeDetectorRef,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    SharedService.foodStatusChange.subscribe(() => {
      this.reloadFoodStatus();
    })
    this.reloadFoodStatus();
    this.authenticationService.getProfile().subscribe(
      res => {
        this.role = res.role.name;
      }
    )
  }

  reloadFoodStatus() {
    this.orderService.getOrders({
      page: 0,
      status: 3,
      size: 999
    }).subscribe(pageData => {
      if (pageData.content.length > 0) {
        this.rows = [];
        pageData.content.forEach(order => {
          let tableData = order.tables;
          let order_id = order.id;
          let customer = order.customer.name;
          order.orderDetail.forEach(
            detail => {
              if (detail.status == 2 && this.role == 'WAITER') {
                this.rows.push({
                  id: detail.id,
                  name: detail.foodName,
                  table: tableData,
                  order_id: order_id,
                  quantity: detail.quantity,
                  status: detail.status,
                  customerName: customer
                });
              }
              if (detail.status < 2 && this.role == 'CHEF') {
                this.rows.push({
                  id: detail.id,
                  name: detail.foodName,
                  table: tableData,
                  order_id: order_id,
                  quantity: detail.quantity,
                  status: detail.status,
                  customerName: customer
                });
              }
            });
        });
      }
      this.ref.detectChanges();
    });
  }

  changeStatus(row: any, status: number) {
    this.foodName = row.name;
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    this.row = row;
    this.status = status;
  }
  decline() {
    this.modalRef.hide();
  }

  confirm() {
    this.row.status = -1;
    this.orderService.changeDetailStatus(this.row.id, this.status, this.row.order_id).subscribe(data => {
      this.reloadFoodStatus(); 
    });
    this.modalRef.hide();
  }

}
