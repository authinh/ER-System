import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../../service/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'category.list.component.html'
})
export class CategoryListComponent implements OnInit {
  page = new Page();
  @ViewChild('categoryTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows = [];
  filterForm = new FormGroup({
    search: new FormControl(''),
  });
  deleteRow: any = {};
  request: any = {};
  constructor(private modalService: BsModalService, private categoryService: CategoryService, private toastr: ToastrService) { 
  }
  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.request.page = pageInfo.offset;
    this.categoryService.getCategorys(this.request).subscribe(pagedData => {
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
    this.setPage({ offset: 0 });
  }

  decline() {
    this.modalRef.hide();
  }

  confirm() {
    this.categoryService.deleteCategorys(this.deleteRow.id)
      .subscribe(data => {
        this.toastr.success('Danh mục được xóa thành công.');
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

  getHeight(row: any, index: number): number {
    console.log(row);
    return 150;
  }
}
