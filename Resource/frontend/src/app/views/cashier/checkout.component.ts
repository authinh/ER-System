import { Component, OnInit, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './checkout.component.html'
})export class CheckOutComponent implements OnInit {

  orderId: number = Number.NaN;
  name: string;
  phone: string;
  dateNow: string;
  returnMoneyGlobal: number;
  
  myGroup = new FormGroup({
       receive: new FormControl('', Validators.required),
       return: new FormControl('', Validators.required),
       total: new FormControl('', Validators.required),
  });

  orderDetail: {item: string, quantity: number, unitPrice: number, total: number}[] = [];

  constructor(private route: ActivatedRoute,
  	private orderService: OrderService,
  	private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {  	
    let ts = new Date();
    this.dateNow = ts.toLocaleString();
    this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrder(this.orderId).subscribe(data => {
      console.log(data);
      this.name = data.customer.name;
      this.phone = data.customer.phone;
    	let total = 0;
    	for(let detail of data.orderDetail){
        if (detail.status != 3) continue;
    		total += detail.quantity * detail.foodPrice;
    		this.orderDetail.push({
    			item: detail.foodName,
    			quantity: detail.quantity,
    			unitPrice: detail.foodPrice,
    			total: detail.quantity * detail.foodPrice
    		});
    	}
    	this.myGroup.get('total').setValue(total);
    	console.log(total);
    });
  }

  changeReceive(event:any) {
  	let total = this.myGroup.get('total').value;
    let returnMoney = this.myGroup.get('receive').value - total;
    this.returnMoneyGlobal = returnMoney;
  	this.myGroup.get('return').setValue(this.returnMoneyGlobal);
  }

  checkOutAction(){
    if(this.returnMoneyGlobal < 0 || this.myGroup.get('receive').value == "" || this.myGroup.get('receive').value == null) {
      this.toastr.error('Không đủ tiền để thanh toán hóa đơn này');
      return;
    } else {
      this.orderService.checkout(this.orderId).subscribe(
        data => {
          this.toastr.success('Hóa đơn thanh toán thành công');
          this.router.navigate(['/manage/cashier']);
        },
        error => {
          this.toastr.error(error.error.message);
        }
      )
    }
  }
}
