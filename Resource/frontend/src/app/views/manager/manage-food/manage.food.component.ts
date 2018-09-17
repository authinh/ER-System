import { Component, OnInit, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { Food } from '../../../model/food';
import { FoodService } from '../../../service/food.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Page } from '../../../model/page';

@Component({
  templateUrl: './manage.food.component.html'
})export class ManageFoodComponent implements OnInit, OnChanges {

  page = new Page();
  @ViewChild('foodTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows = [];

  filterForm = new FormGroup({
    search: new FormControl(''),
    status: new FormControl(-1)
  });
  deleteRow: any = {};
  request: any = {}

  constructor(private foodService: FoodService, 
    private modalService: BsModalService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    let name = this.filterForm.get('search').value;
    let status = this.filterForm.get('status').value;
    this.request.page = pageInfo.offset;
    this.foodService.findFood({
      name: name,
      status: status,
      page: this.request.page,
      size: 9
    }).subscribe(pageData => {
      this.page.totalElements = pageData.totalElements;
      this.page.pageNumber = pageData.number;
      this.page.size = pageData.size;
      this.rows = pageData.content;
    });
  }

  ngOnChanges() {
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  openModal(row: any) {
    this.deleteRow = row;
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  decline() {
    this.modalRef.hide();
  }

  confirm() {
    this.foodService.deleteFood(this.deleteRow.id)
      .subscribe(data => {
        this.toastr.success('xóa thành công');
        this.modalRef.hide();
        this.setPage({ offset: 0 });
      },
        error => {
          this.toastr.error(error.error.message);
          this.modalRef.hide();
          this.setPage({ offset: 0 });
        }
      );
  }

  filterFormSubmit(){
    this.setPage({ offset: 0 });
  }

}
