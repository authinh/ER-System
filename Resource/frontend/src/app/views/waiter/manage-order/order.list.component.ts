import { orderFood } from './../../../model/orderFood';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../service/order.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FoodCategory } from '../../../model/foodCategory';
import { CommonService } from '../../../service/common.service';
import { FoodService } from '../../../service/food.service';
import { Food } from '../../../model/food';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../service/authentication.service';
import { SharedService } from '../../../service/shared.service';

@Component({
  styleUrls: ['../../../../scss/available_table.scss',
  '../../../../scss/menu-style.scss'
  ],
  templateUrl: 'order.list.component.html'
})
export class OrderListComponent implements OnInit {
  page = new Page();
  @ViewChild('orderTable') table: any;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  modalRef: BsModalRef;
  rows = [];
  filterForm = new FormGroup({
  });

  deleteRow: any = {};
  request: any = {};
  pageFoodCategory: number;
  orderDTO: any = {};
  rowGroupMetadata: any ={};

  categoryID: number;
  pageCategory: number;
  foodCategories: FoodCategory[] = [];
  foodCategoriesFather: FoodCategory[] = [];
  foodCategoriesChild: FoodCategory[] = [];
  pageFoodNumber: number[] = [];
  numberOfElement: number = 9;
  food: Food[] = [];
  pageSize: number;
  categoryGlobal: string;

  orderFood: orderFood[] = [];
  orderFoodArray: string="";
  deleteId: any;
  foodName: string;
  total: number = 0;
  pageN : orderFood[] = [];
  orderId: number;
  canAddFood: boolean = true;
  recommendFoods: orderFood[] = [];
  customerProfile: any;
  isStaff: boolean = false;
  
  constructor(private modalService: BsModalService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private commontService: CommonService,
    private foodService: FoodService,
    private authenticationService : AuthenticationService) {
  }
  ngOnInit(): void {
    this.authenticationService.getCustomerProfile().subscribe(data => {
      if (data == null) {
        this.isStaff = true;
      } else {
        this.isStaff = false;
       //this.orderDTO.status = 'BOOKED';
      }
    });
    document.body.classList.add('sidebar-minimized');
    this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.commontService.getFoodCategory().subscribe(res => {
      this.foodCategories = res.content;
      
      this.foodCategories.forEach(item => {
        if(item.parent == null) {
          this.foodCategoriesFather.push(item);
        } else {
          this.foodCategoriesChild.push(item);
        }
      }); 

      if(this.foodCategoriesFather[0].id != undefined) {
        this.categoryID = this.foodCategoriesFather[0].id;
        this.pageCategory = 0;
        this.getCategoryAndPage(this.categoryID, this.pageCategory);
      }
    });
    SharedService.foodStatusChange.subscribe(() => {
      this.reloadOrderList();
    });
    this.getRecommend();
    this.authenticationService.getProfile().subscribe(data=>{
      this.customerProfile = data;
      this.reloadOrderList();
    })
  }

  reloadOrderList(){
    this.orderFood = [];
    
     if(!Number.isNaN(this.orderId)){
      this.orderService.getOrder(this.orderId).subscribe(data=>{
        if(data.status == "DELETED" || data.status == "CLOSED") {
          this.canAddFood = false;
        }
        if(!this.authenticationService.isStaff && data.customer.id!= this.customerProfile.id){
          this.router.navigate(['/403'])
        }
        this.orderDTO.status = data.status;
        this.orderDTO.orderDetail = data.orderDetail;
        this.toListorderFood();  
      });
    }else {
      console.log("thua roi");
    } 
  }

  getRecommend(){
    this.orderService.getRecommend(this.orderFoodArray, 10).subscribe(data =>{
      this.recommendFoods = data;
      //this.recommendFoods = this.orderFood;
    },
      error => {
        this.toastr.error(error.error.message);
       // this.recommendFoods = this.orderFood;
      }
    );
  }

  submitOrder(){
      this.orderDTO.orderDetail = this.orderFood;
     if(this.canAddFood == false) {
      this.toastr.error('Thực đơn này đã đóng, bạn không thể thao tác với nó nữa')
      return;
    } else { 
      this.toListOrderDetail();
      this.orderService.updateOrderByOrderDetail(this.orderId, this.orderDTO.orderDetail).subscribe(data =>{
        this.toastr.success('đặt món thành công');
        this.orderDTO = data;
      },
        error => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  getCategoryAndPage(cateId: number,pageNumber?: number, cateName?: string) {
    this.categoryGlobal = cateName;
    this.pageCategory = pageNumber;
    this.categoryID = cateId;
    this.pageFoodNumber = [];
    this.foodService.getFoodbyPage(this.pageCategory, this.categoryID, this.numberOfElement).subscribe(
      res => {
        this.food = res.content;
        this.pageSize = res.totalPages;
        for (let i = 1; i <= this.pageSize; i++) {
          this.pageFoodNumber.push(i);
        }
      }
    )
  }

  getFoodByPage() {
    this.foodService.getFoodbyPage(this.pageCategory, this.categoryID, this.numberOfElement).subscribe(
      res => {
        this.food = res.content;
      }
    )
  }

  setPage() {
      this.page.totalElements = this.orderFood.length;
      this.page.size = 999;
     // this.page.pageNumber = Math.ceil(this.orderFood.length/this.page.size);
      this.rows = this.orderFood;
      this.rows = [...this.rows];
      this.getRecommend();
      this.updateRowGroupMetaData();
  }

  openModal(rowIndex?: any) {
    if(this.canAddFood == false) {
      this.toastr.error('Thực đơn này đã đóng, bạn không thể thao tác với nó nữa')
      return;
    } else 
    {
      this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
      if(rowIndex == undefined) {
        return;
      } else  {
        this.deleteId = rowIndex;
        this.foodName = rowIndex.name;
      }
    }
  }

  decline() {
    this.modalRef.hide();
  }

  confirm() {
    console.log('deletedID ', this.deleteId);
    if(this.deleteId!= null) {
      for(let i=0; i< this.orderFood.length; i++) {
        if(this.deleteId.id == this.orderFood[i].id && this.orderFood[i].status == 0) {
          this.orderFood.splice(i,1);
        }
      } 
      this.toListOrderDetail();
      this.deleteId = null;
      this.totalPrice();
    } else {
      this.resetOrder();
      this.toListOrderDetail();  
    }
    this.modalRef.hide();
    this.setPage();
    this.updateRowGroupMetaData();
  }

  getPage(item: number) {
    this.pageCategory = item - 1;
    if(this.pageCategory < 0) {
      this.pageCategory = 0;
    }
    this.getFoodByPage();
  }

  pagePlus() {
    this.pageCategory++;
    if(this.pageCategory > this.pageSize-1) {
      this.pageCategory = this.pageSize-1;
    }
    this.getFoodByPage();
  }

  pageDif() {
    this.pageCategory--;
    this.getFoodByPage();
  }

  addFoodToOrder(foodItem: any) {
    let flag = false;
    this.orderFood.forEach(item => {
      if( item.id == foodItem.id && (item.status == 0)) {
        item.quantity ++;
        flag = true;
      }
    })
    if (flag) return;
    foodItem.status = 0;
    
    foodItem.quantity = 1;
   // foodItem.category = this.categoryGlobal;
  //  console.log('categoryGlobal ', this.categoryGlobal);
  //  console.log('foodItem ', foodItem);
  //  this.foodCategoriesFather.forEach(item => {
  //   console.log('aaaaaaaaaaaa ', item);
  // })
  // this.foodCategoriesChild.forEach(item => {
  //   console.log('bbbbbbbbbbb ', item);
  // })
   for(let i=0; i<foodItem.categories.length; i++) {
    if(foodItem.categories[i].parent == null) {
      foodItem.category = foodItem.categories[i].name;
      break;
    } else {
      foodItem.category = foodItem.categories[i].parent.name;
      break;
    }
  }
    this.orderFoodArray+= "%2C"+foodItem.id;
    this.getRecommend();
    this.orderFood.push(foodItem);
    this.updateRowGroupMetaData();
  }

  pickToOrder(foodItem: orderFood) { 
    if(this.canAddFood == false || (this.isStaff == false && this.orderDTO.status != 'BOOKED')) {
      this.toastr.error('Hiện tại bạn không thể thao tác với thực đơn')
      return;
    } else {
      this.addFoodToOrder(foodItem); 
      this.rows = this.orderFood;
      this.setPage();
      this.totalPrice();
    };
  }

  resetOrder() {
    console.log('vao roi');
    this.orderFoodArray = "";
    this.orderFood = [];
    console.log('22222 ', this.orderFood);
    this.setPage();
    this.totalPrice();
  }

  onKey(foodItem: orderFood, $event) {
    console.log('eventtttttt ', $event);
    let valueElement: any;
    if(!$event.srcElement) {
      valueElement = $event.originalTarget;  
      foodItem.quantity = Number.parseInt(valueElement.value);
      if($event.originalTarget.valueAsNumber.isNaN || $event.originalTarget.value == undefined) {
        $event.originalTarget.value = 1;
      }
      if($event.originalTarget.valueAsNumber > foodItem.quantity || $event.originalTarget.valueAsNumber == NaN) {
        foodItem.quantity = foodItem.quantity;
        $event.originalTarget.value = foodItem.quantity;
      }
      if(foodItem.quantity < 1 || foodItem.quantity == NaN ||valueElement.value == "") {
        foodItem.quantity = 1;
        $event.originalTarget.value = 1;
      } 
    } else {
      valueElement = $event.srcElement;  
      foodItem.quantity = Number.parseInt(valueElement.value);
      console.log(' foodItem.quantity ', foodItem.quantity);
      console.log(' $event.srcElement.valueAsNumber ', $event.srcElement.valueAsNumber);
      if($event.srcElement.valueAsNumber.isNaN || $event.srcElement.valueAsNumber == NaN) {
        foodItem.quantity = foodItem.quantity;
        $event.srcElement.value = 1;
      }
      if($event.srcElement.valueAsNumber > foodItem.quantity || $event.srcElement.valueAsNumber == NaN) {
        foodItem.quantity = foodItem.quantity;
        $event.srcElement.value = foodItem.quantity;
      }
      if(foodItem.quantity < 1 || foodItem.quantity == NaN ||valueElement.value == "") {
        foodItem.quantity = 1;
        $event.srcElement.value = 1;
      } 
      console.log('11111111 ', $event.srcElement.valueAsNumber === NaN);
      if($event.srcElement.valueAsNumber.isNaN && foodItem.quantity > 0) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa ');
        foodItem.quantity = foodItem.quantity;
        $event.srcElement.value = foodItem.quantity;
      }
    }
   
    this.totalPrice();
  }

  inputValidate(foodItem: orderFood, $event : any) {
    const keyCode = $event.keyCode;
    // if (!inArray(KEYCODES_FUNC, keyCode)) {
    //   if (!((KEYCODES.NUMBER_0 <= keyCode && keyCode <= KEYCODES.NUMBER_9) || (keyCode >= KEYCODES.NUMPAD_0 && keyCode <= KEYCODES.NUMPAD_9)
    //       || keyCode === KEYCODES.NUMPAD_DASH || keyCode === KEYCODES.FORWARD_SLASH || keyCode === KEYCODES.DEVIDE)) {
    //     event.preventDefault();
    //   }
    // }
    console.log('keycode ', keyCode);
  }

  onKeyNote(foodItem: orderFood, $event) {
    let valueElement: any;
    valueElement = event.srcElement;
    foodItem.note = valueElement.value;
    this.totalPrice();
  }

  totalPrice() {
    this.total = 0;
    this.orderFood.forEach(item => {
      this.total += item.quantity*item.price; 
    })
  }

  toListOrderDetail(){
    this.orderDTO.orderDetail = [];
    this.orderFood.forEach(item => {
      let orderDetail: any = {
        "food": {
        }
      };
      orderDetail.order_id = this.orderId;
      orderDetail.food.id = item.id;
      orderDetail.id = item.orderDetailId;
      orderDetail.foodName = item.name;
      orderDetail.foodPrice = item.price;
      orderDetail.quantity = item.quantity;
      orderDetail.status = item.status;
      orderDetail.note = item.note;
      this.orderDTO.orderDetail.push(orderDetail);
    });

  }

  toListorderFood(){
    this.orderFoodArray = "";
    this.orderDTO.orderDetail.forEach(item => {
      let orderDetailRow: any = {};
      orderDetailRow.id = item.food.id; 
      orderDetailRow.name = item.foodName ;
      orderDetailRow.price = item.foodPrice ;
      orderDetailRow.quantity = item.quantity;
      orderDetailRow.orderDetailId = item.id;
      orderDetailRow.status = item.status;
      orderDetailRow.note = item.note;
      for(let i=0; i<item.food.categories.length; i++) {
        if(item.food.categories[i].parent == null) {
          orderDetailRow.category = item.food.categories[i].name;
          break;
        } else {
          orderDetailRow.category = item.food.categories[i].parent.name;
          break;
        }
      }
      //orderDetailRow.category = this.categoryGlobal;
      this.orderFoodArray+= "%2C"+ item.food.id;
      this.orderFood.push(orderDetailRow);
      
    });
    this.rows = this.orderFood;
    this.setPage();
    this.totalPrice();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    
    if (this.orderFood) {
        this.orderFood.sort((a: orderFood, b: orderFood) => {
          return a.category < b.category ? 1 : -1;
        });
        for (let i = 0; i < this.orderFood.length; i++) {
            let rowData = this.orderFood[i];
            let category = rowData.category;
            if (i == 0) {
                this.rowGroupMetadata[category] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.orderFood[i - 1];
                let previousRowGroup = previousRowData.category;
                if (category === previousRowGroup)
                    this.rowGroupMetadata[category].size++;
                else
                    this.rowGroupMetadata[category] = { index: i, size: 1 };
            }
        }
    }
    
}
ScrollDown() {
  var element = document.getElementById("thucdon");
  element.scrollIntoView();
}
}
