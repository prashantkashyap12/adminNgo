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

   this.blogListView()
  }

  updateAct:any=true;
  showList:any=false;
  blogForm!:FormGroup;
  keyword="linkText1";
  blogTran:any;
  data:any = [  ]
  IFromFile:File | null = null;

  selectEvent(data:any){
    this.updateAct = false;

    this.datapatch(data);
  }
  datapatch(data:any){
    console.log(data);
    this.blogTran = data.blogTran;
    this.blogForm.get("date")?.patchValue(moment(data.date).format("YYYY-MM-DD")); 
    // this.blogForm.get("imgPath")?.patchValue(data.imgPath);
    this.blogForm.get("linkText1")?.patchValue(data.linkText1);
    this.blogForm.get("rights")?.patchValue(data.rights);
    this.blogForm.get("type")?.patchValue(data.type);
  }


  onChangeSearch(data:any){
    console.log(data, "b");
  }
  onFocused(data:any){
    console.log(data, "c");
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

  blogListView(){
    this._blog.bloglisView()
    .then(res=>{
      if(res.state = true){
        this.data = res.result;
      }
    }).catch(error=>{

    })
  }


  onSubmit(){
    if(this.blogForm.invalid){
      alert("Form is Invalid");
      return;
    }
    let dataLs = this.isValid();
    if(this.updateAct){
      this._blog.bloglisAdd(dataLs).then(res=>{
        if(res.state){
          console.log(res);
        }
      }).catch(err=>{
        console.log(err);
      })
    }else{
      // update Record
    }
    // let result  = this._blog.addBlogLs().subscribe(res=>{
      // console.log(res)
    // });
  }

  delet(){
    this._blog.bloglisDelete(this.blogTran).subscribe(res=>{
      if(res.state){
        alert("Toster = Record Hasbeen Deleted");
      }
    })
  }
  allot(){
    this.showList= !this.showList;
    // set focus on search bar
  }


  fresh(){   // Done
    this.init();
    this.updateAct = true;
    this.showList = false

  }



}
