import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Table } from '../../../model/table';
import { TableServiceService } from '../../../service/table.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: 'table.list.component.html'
})
export class TableListComponent implements OnInit {
  page = new Page();
  @ViewChild('tableTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows: Table[] = [];
  deleteId: number;
  tableName: string;
  tableNote: string;
  numberOfSeat: number;
  request: any = {};
  deleted: boolean = false;
  idTable: number;

  constructor(private modalService: BsModalService,
    private tableService: TableServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  filterForm = new FormGroup({
    search: new FormControl(''),
    numberOfSeating: new FormControl(''),
  });

  filterFormSubmit() {
    this.request.search = this.filterForm.get('search').value;
    this.request.numberOfSeating = parseInt(this.filterForm.get('numberOfSeating').value);
    

    if(Number.isNaN(this.request.numberOfSeating)) {
      this.request.numberOfSeating = '-1';
      this.setPage({ offset: 0 });
      return;
    }

    if(this.request.numberOfSeating < 0 || this.request.numberOfSeating >40 ) {
      this.toastr.error('Number of seating must between 0 and 40');
      return;
    }
  
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.request.page = pageInfo.offset;
    this.tableService.getAllTable(this.request).subscribe(pagedData => {
      this.page.totalElements = pagedData.totalElements;
      this.page.pageNumber = pagedData.number;
      this.page.size = pagedData.size;
      this.rows = pagedData.content;
      if(pagedData.number >= pagedData.totalPages) {
        this.setPage({ offset: 0 });
      }
    });
  }
  
  openModal(row) {
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    console.log('roww ', row);
    // this.deleteId = rowId;
    // this.tableName = tableName;
    this.tableName = row.name;
    this.tableNote = row.note;
    this.numberOfSeat = row.numberOfSeating
    this.idTable = row.id;
  }

  confirm() {
    let data = {
      "name": this.tableName,
      "note": this.tableNote,
      "numberOfSeat": this.numberOfSeat,
      "status": 2,
    }

    this.tableService.editTableById(this.idTable, data).subscribe(respone => {
      this.toastr.success('Xoá bàn thành công');
      this.setPage({ offset: this.request.page });
    },
      error => {
        this.toastr.error(error.error.massage);
      }
    );
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

}
