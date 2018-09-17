import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Food } from '../../../model/food';
import { Input } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChanges } from '@angular/core';
import { FoodService } from '../../../service/food.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  styleUrls: ['../../../../scss/available_table.scss',
  '../../../../scss/menu-style.scss'
  ],
  selector: 'app-homepagedetail',
  templateUrl: './homepagedetail.component.html'
})
export class HomepagedetailComponent implements OnInit, OnChanges {
  @Input() categoryID: number;
  @Input() page: number;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  pageSize: number;
  pageNumber: number[] = [];
  food: Food[] = [];
  numberOfElement: number = 9;
  logined: boolean = false;

  myInterval = 1000;
  activeSlideIndex = 0;

  constructor(private modalService: BsModalService,
    private commontService: CommonService,
    private authenticationService : AuthenticationService,
    private foodService: FoodService) { }

  ngOnInit() {
    this.authenticationService.getCustomerProfile().subscribe(data => {
      if (data == null) {
        this.logined = false;
      } else {
        this.logined = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getFoodByPageAndCategory();
  }

  getFoodByPageAndCategory() {
    if (this.page === undefined || this.categoryID === undefined) {
      return;
    }
    this.pageNumber = [];
    this.foodService.getFoodbyPage(this.page, this.categoryID, this.numberOfElement).subscribe(
      res => {
        this.food = res.content;
        this.pageSize = res.totalPages;
        for (let i = 1; i <= this.pageSize; i++) {
          this.pageNumber.push(i);
        }
      }
    )
  }

  getFoodByPage() {
    this.foodService.getFoodbyPage(this.page, this.categoryID, this.numberOfElement).subscribe(
      res => {
        this.food = res.content;
      }
    )
  }

  getPage(item: number) {
    this.page = item - 1;
    if(this.page < 0) {
      this.page = 0;
    }
    this.getFoodByPage();
  }

  pagePlus() {
    this.page++;
    if(this.page > this.pageSize-1) {
      this.page = this.pageSize-1;
    }
    this.getFoodByPage();
  }

  pageDif() {
    this.page--;
    this.getFoodByPage();
  }

  openModal() {
    if(this.logined == false){
      this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    }else{
      window.location.href = '#/manage/view-available-table';
    }
  }

  decline() {
    this.modalRef.hide();
  }

  confirm() {
    window.location.href = '/customer/login';
    this.modalRef.hide();
  }

}
