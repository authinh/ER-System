import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TableServiceService } from '../../../service/table.service';
import { Table } from '../../../model/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-table',
  templateUrl: './table.edit.component.html',
  styleUrls: ['./table.edit.component.scss']
})
export class EditTableComponent implements OnInit {

  idTable: number;
  tableDetail: Table;
  isSubmited = false;
  isNameValid: boolean;
  idSeatingValid: boolean;

  constructor(private route: ActivatedRoute,
    private tableService: TableServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    if (id == 0) {
      this.idTable = 0;
      this.tableDetail = new Table;
    } else {
      this.idTable = id;
      this.getTableById(this.idTable);
    }
  }

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    numberOfSeating: new FormControl('', Validators.required),
    note: new FormControl('')
  });

  getTableById(tableId: number) {
    this.tableService.getTableByID(tableId).subscribe(res => {
      this.tableDetail = res;
    })
  }

  onFormSubmit() {
    this.isSubmited = true;
    let data = {
      "name": this.tableDetail.name,
      "note": this.tableDetail.note,
      "numberOfSeat": this.tableDetail.numberOfSeating,
      "status": 0,
    }

    if (this.editForm.valid) {
      if (parseInt(data.numberOfSeat) < 0 || parseInt(data.numberOfSeat) > 40) {
        this.toastr.error('Number of seating must between 0 and 40');
        return;
      }
      if (this.idTable != 0) {
        this.tableService.editTableById(this.idTable, data).subscribe(respone => {
          this.toastr.success('Edit table success');
          this.router.navigate(['/manage/table']);
        },
          error => {
            this.toastr.error(error.error.massage);
          }
        );
      } else {
        this.tableService.createNewTable(data).subscribe(respone => {
          this.toastr.success('Create new table success');
          this.router.navigate(['/manage/table']);
        },
          error => {
            this.toastr.error(error.error.massage);
          }
        );
      }
    }
  }

}