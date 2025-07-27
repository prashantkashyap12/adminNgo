import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BlogService } from '../service/blog.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';
import { url } from '../../interface/api_config';
@Component({
  selector: 'app-blog',
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, AutocompleteLibModule, CommonModule],
  providers:[BlogService]
})
export class BlogComponent implements OnInit {


  loader:any = false;
  constructor(private _fb:FormBuilder, private _blog:BlogService){}
  ngOnInit(){
   this.init(); 
   this.blogListView()
  }
    private baseUrl = new url().value;

  updateAct:any=true;
  showList:any=false;
  blogForm!:FormGroup;
  keyword="linkText1";
  blogTran:any;
  data:any = [  ]
  IFromFile:File | null = null;
  imagePreview:any = null;

  selectEvent(data:any){
    this.updateAct = false;
    this.datapatch(data);
  }

  datapatch(data:any){
    this.blogTran = data.blogTran;
    console.log(this.blogTran);
    this.imagePreview = this.baseUrl+data.imgPath;
    console.log(this.imagePreview, "datafil");
    this.blogForm.patchValue({
      date:moment(data.date).format('YYYY-MM-DD'),
      linkText1:data.linkText1? data.linkText1 : '',
      rights:data.rights,
      type:data.type,
      imgPath:data.imgPath,
      link:'BlogDetails',
      linkText2:'Read More'
    })
  }

  init(){
    this.blogForm = this._fb.group({
      date:[moment(new Date()).format('DD-MM-YYYY')],
      linkText1:['', [Validators.required]],
      rights:['', [Validators.required]],
      type:['', [Validators.required]],
      imgPath:[null, [Validators.required]],
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
      imgPath:this.blogForm.value.imgPath ?? null,
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
      console.log(error);
    })
  }

  fileRec:any;
  fileUpdate(event:any){
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileRec = file;
    }
  }

  onSubmit(){
    const dataLs = new FormData();
    dataLs.append("date", this.blogForm.value.date ? moment(this.blogForm.value.date).format('YYYY-MM-DD') : '');
    dataLs.append("linkText1", this.blogForm.value.linkText1? this.blogForm.value.linkText1 : '');
    dataLs.append("rights", this.blogForm.value.rights? this.blogForm.value.rights : '');
    dataLs.append("type", this.blogForm.value.type ? this.blogForm.value.type : '');
    dataLs.append("imgPath", this.fileRec as File ? this.fileRec : null);
    dataLs.append("link", 'BlogDetails');
    dataLs.append("linkText2", 'Read More');
    if(this.updateAct){
      this._blog.bloglisAdd(dataLs).then(res=>{
        if(res.state){
          alert(res.message1);
          this.fresh();
          this.allot();
          this.showList = false
          this.blogListView();
          this.fresh()
        }
      }).catch(err=>{
        console.log(err);
      })
    }
    else{
      for(const key of (dataLs as any).keys()){
        console.log(key, dataLs.get(key));
      }
      dataLs.append("blogid",this.blogTran);
      this._blog.bloglisUpdate(dataLs).then(res=>{
        if(res.state){
          alert("updated");
          this.ngOnInit();
        }
      })
    }
  }

  delet(){
    this._blog.bloglisDelete(this.blogTran).subscribe(res=>{
      if(res.state){
        alert("Toster = Record Hasbeen Deleted");
        this.blogListView()
        this.fresh();
        this.allot()
      }
    })
  }
  allot(){
    this.showList= !this.showList;
    this.fresh()
  }
  fresh(){   // Done
    this.init();
    this.updateAct = true;
    this.showList = false
    this.imagePreview = "";
  }
}
