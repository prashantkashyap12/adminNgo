import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BlogService } from '../service/blog.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, AutocompleteLibModule, CommonModule],
  providers:[BlogService]
})
export class BlogComponent implements OnInit {

  constructor(private _fb:FormBuilder, private _blog:BlogService){}
  ngOnInit(){
   this.init(); 
  }

  updateAct:any=true;
  showList:any=false;
  blogForm!:FormGroup;
  keyword="name";
  data:any = [
    {name:'India', id:1},
    {name:'Japan', id:2}
  ]

  selectEvent(data:any){
    console.log(data + "A");
    this.updateAct = false;
  }

  onChangeSearch(data:any){
    console.log(data+ "b");
  }
  onFocused(data:any){
    console.log(data+ "c");
  }

  init(){
    this.blogForm = this._fb.group({
      date:[moment(new Date()).format('DD-MM-YYYY')],
      linkText1:['', [Validators.required]],
      rights:['', [Validators.required]],
      type:['', [Validators.required]],
      imgPath:['', [Validators.required]],
      link:'BlogDetails',
      linkText2:'Read More'
    })
  }

  isValid(){
    return {
      date:this.blogForm.value.date ?? '',
      linkText1:this.blogForm.value.linkText1 ?? '',
      rights:this.blogForm.value.rights ?? '',
      type:this.blogForm.value.type ?? '',
      imgPath:this.blogForm.value.imgPath ?? '',
      link:'BlogDetails',
      linkText2:'BlogDetails'
    }
  }



  onSubmit(){
    if(this.blogForm.invalid){
      alert("Form is Invalid");
      return;
    }
    let model2 = this.isValid;
    if(this.updateAct){
      // Save Record
    }else{
      // update Record
    }
    // let result  = this._blog.addBlogLs().subscribe(res=>{
      // console.log(res)
    // });
  }

  delet(){
  }
  allot(){
    this.showList= !this.showList;
  }


  fresh(){   // Done
    this.init();
    this.updateAct = true;
    this.showList = false

  }



}
