import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Page } from '../../../model/page';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../service/food.service';
import { FoodCategory } from '../../../model/foodCategory';
var self;

@Component({
  templateUrl: 'food.editor.component.html'
})
export class FoodEditorComponent implements OnInit{
  foodcategory: FoodCategory[] = []
  category: any;
  isSubmited: boolean = false;
  foodID: number = Number.NaN;
  data: any = null;
  ready: boolean = false;
  img: any;
  editorForm = new FormGroup({
    foodName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
    status: new FormControl('ACTIVE')
  });

  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    self = this;
    this.foodID = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.foodService.getAllCategory().subscribe(data => {
      this.foodcategory = data.content;
    });
    if(!Number.isNaN(this.foodID)){
      this.foodService.getOneFood(this.foodID).subscribe(data=>{
        this.editorForm.get('foodName').setValue(data.name);
        this.editorForm.get('price').setValue(data.price);
        this.editorForm.get('description').setValue(data.description);
        this.editorForm.get('status').setValue(data.status);
        let choose = [];
        for (var i = data.categories.length - 1; i >= 0; i--) {
          choose.push(data.categories[i].id);
        }
        this.category = choose;
        if (data.image != null)
          this.img = data.image;
        else
          this.img = "";
      });
    }
  }

  editorFormSubmit() {
    this.isSubmited = true;
    this.data = {
      id: null,
      name: this.editorForm.get('foodName').value.trim(),
      price: this.editorForm.get('price').value,
      description: this.editorForm.get('description').value,
      status: this.editorForm.get('status').value,
      image: this.img,
      categories: []
    }
    if (!this.validateByRegex(this.data.name, '[^]+')) {
      this.editorForm.get('foodName').setErrors({ message: 'Name is invalid' })
    }
    if (!this.validateByRegex(this.data.price, '^[0-9.]{1,100}$')) {
      this.editorForm.get('price').setErrors({ message: 'Price is invalid' })
    }
    // if (this.img.length > 25000) {
    //   console.log(this.img.length);
    //   this.editorForm.get('image').setErrors({ message: 'Image too large' })
    // }
    if (this.editorForm.valid) {
      if (Number.isNaN(this.foodID)) {
        this.data.categories = this.category;
        this.foodService.createNewFood(this.data).subscribe(
          data => {
            this.toastr.success('thêm mới thành công');
            this.router.navigate(['/manage/food/list']);
          },
          error => {
            this.toastr.error(error.error.message);
          }
        )
      } else {
        this.data.id = this.foodID;
        this.data.categories = this.category;
        console.log(this.data);
        this.foodService.updateFood(this.data).subscribe(
          data => {
            this.toastr.success('cập nhật thành công');
            this.router.navigate(['/manage/food/list']);
          },
          error => {
            this.toastr.error(error.error.message);
          }
        )
      }
    }
  }

  validateByRegex(string: string, patterns: string) {
    let pattern = new RegExp(patterns);
    return pattern.test(string);
  }

  readUrl(event:any) {
    console.log('eventttttttttttt ',event);
    let imageName = "";
    
   if (event.srcElement) {
    imageName = event.srcElement.files[0].name.toUpperCase();
    if (!imageName.endsWith('JPG') && !imageName.endsWith('PNG')){
      console.log("in in ");
      this.toastr.error("Chỉ có thể upload file ảnh (jpg hoặc png)");
      return;
    }
    var reader = new FileReader();
    console.log('aaaaaaaaaaaaaaaaaaa ', event.target);
    reader.onload = (event:any) => {
      this.img = event.target.result;
      // if (this.img.length > 25000) {
      //   console.log(this.img.length);
      //   this.editorForm.get('image').setErrors({ message: 'Image too large' })
      // }
    }

    reader.readAsDataURL(event.target.files[0]);
  } 
    if(event.explicitOriginalTarget.files && event.explicitOriginalTarget.files[0]) {
      imageName = event.explicitOriginalTarget.files[0].name.toUpperCase();
      if (!imageName.endsWith('JPG') && !imageName.endsWith('PNG')){
        console.log("in in ");
        this.toastr.error("Chỉ có thể upload file ảnh (jpg hoặc png)");
        return;
      }
      var reader = new FileReader();
      console.log('aaaaaaaaaaaaaaaaaaa ', event.target);
      reader.onload = (event:any) => {
        this.img = event.target.result;
     }
     reader.readAsDataURL(event.target.files[0]);
    }
  
}
}

