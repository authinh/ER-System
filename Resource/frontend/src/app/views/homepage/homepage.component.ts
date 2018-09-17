import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { FoodCategory } from '../../model/foodCategory';
import { CustomerProfileService } from '../customer-profile/customer.profile.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../../scss/menu-style.scss'],
})
export class HomepageComponent implements OnInit {
  categoryID: number;
  page: number;
  foodCategories: FoodCategory[] = [];
  foodCategoriesFather: FoodCategory[] = [];
  foodCategoriesChild: FoodCategory[] = [];
  customerProfile: any;

  constructor(private commontService: CommonService,
    private customerProfileService: CustomerProfileService) { }

  ngOnInit() {
    this.commontService.getFoodCategory().subscribe(res => {
      this.foodCategories = res.content;
      
      this.foodCategories.forEach(item => {
        if(item.parent == null) {
          this.foodCategoriesFather.push(item)
        } else {
          this.foodCategoriesChild.push(item);
        }
      });

      this.categoryID = this.foodCategoriesFather[0].id;
      this.page = 0;
    });

    this.customerProfileService.getProfile().subscribe(data => {
      if (data != null) {
        this.customerProfile = data;
      }
    });
  }

  getCategoryAndPage(cateId: number, pageNumber: number) {
    this.page = pageNumber;
    this.categoryID = cateId;
  }

}
