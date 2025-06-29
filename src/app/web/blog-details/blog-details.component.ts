import { Component } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';
import { url } from '../interface/api_config';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, AutocompleteLibModule, CommonModule],
  providers:[BlogService],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {

  
  constructor(private _fb:FormBuilder, private _blog:BlogService){}
  ngOnInit(){
  this.init(); 
  this.blogListView()
  }
  private baseUrl = new url().value;
  updateAct:any=true;
  showList:any=true;
  blogDetails!:FormGroup;
  keyword="linkText1";
  blogTran:any;
  data:any = [  ]
  IFromFile:File | null = null;

  imagePreview1:any = null;
  imagePreview2:any = null;
  imagePreview3:any = null;
  isVisible = false; 
  blogListHding:any;

  init(){
    this.blogDetails = this._fb.group({
      Img:[null],
      Rights:['', [Validators.required]],
      type:['', [Validators.required]],
      Head:['', [Validators.required]],
      Pera1:['', [Validators.required]],
      Pera2:['', [Validators.required]],
      Blockquate:['', [Validators.required]],
      Pera3:['', [Validators.required]],
      BlogImg1:[null],
      BlogImg2:[null],
      Pera4:['', [Validators.required]],
      FbLink:['', [Validators.required]],
      TwLink:['', [Validators.required]],
      LinkLink:['', [Validators.required]],
      InstLink:['', [Validators.required]],
    })
  }

  // AutoComplete OPEN Data
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
  
  selectEvent(data:any){
    this.updateAct = false;
    this.isVisible = true
    this.datapatch(data);
  }

  datapatch(data:any){
    this.blogTran = data.blogTran;
    this.blogListHding = data.linkText1;
    this._blog.blogDetails(data.blogTran).then(res=>{
      let resp = res.result[0]
      this.datapatch2(resp)
    })
  }
  
  datapatch2(data:any){
    this.blogTran = data.blogTran;
    this._blog.blogDetails(data.blogTran)
    this.imagePreview1= this.baseUrl+data.img !=null ? this.baseUrl+data.img:'Image not Marked'
    this.imagePreview2= this.baseUrl+data.BlogImg1 !=null ? this.baseUrl+data.BlogImg1:'Image not Marked'
    this.imagePreview3= this.baseUrl+data.BlogImg2 !=null ? this.baseUrl+data.BlogImg2:'Image not Marked'
    console.log("1"+this.imagePreview1);
    console.log("2"+this.imagePreview2);
    console.log("3"+this.imagePreview3);

    this.blogDetails.patchValue({
      Img: data['Img'],
      Rights: data['Rights'] ? data['Rights'] : 'Empty Mark',
      type: data['type'] ? data['type'] : 'Empty Mark',
      Head: data['Head'] ? data['Head'] : 'Empty Mark',
      Pera1: data['Pera1'] ? data['Pera1'] : 'Empty Mark',
      Pera2: data['Pera2'] ? data['Pera2'] : 'Empty Mark',
      Blockquate: data['Blockquate'] ? data['Blockquate'] : 'Empty Mark',
      Pera3: data['Pera3'] ? data['Pera3'] : 'Empty Mark',
      BlogImg1: data['BlogImg1'],
      BlogImg2: data['BlogImg2'],
      Pera4: data['Pera4'] ? data['Pera4'] : 'Empty Mark',
      FbLink: data['FbLink'] ? data['FbLink'] : 'Empty Mark',
      TwLink: data['TwLink'] ? data['TwLink'] : 'Empty Mark',
      LinkLink: data['LinkLink'] ? data['LinkLink'] : 'Empty Mark',
      InstLink: data['InstLink'] ? data['InstLink'] : 'Empty Mark'
    })
  }


  img1_FormData:any;
  imgPath1(img:any){
    if(img.target.files[0].size > 1){
      this.img1_FormData = img.target.files[0];
    }else{
      this.img1_FormData=null;
    }
  }
  img2_FormData:any;
  imgPath2(img:any){
    if(img.target.files[0].size > 1){
      this.img2_FormData = img.target.files[0];
    }else{
      this.img2_FormData=null;
    }
  }
  img3_FormData:any;
  imgPath3(img:any){
    if(img.target.files[0].size > 1){
      this.img3_FormData = img.target.files[0];
    }else{
      this.img3_FormData=null;
    }
  }


  onSubmit(){
    let FormData1 = new FormData();
    FormData1.append('Img', this.img1_FormData as File ? this.img1_FormData as File : this.imagePreview3);
    FormData1.append('rigths',this.blogDetails.value.Rights);
    FormData1.append('type',this.blogDetails.value.type);
    FormData1.append('head1',this.blogDetails.value.Head);
    FormData1.append('Pera1',this.blogDetails.value.Pera1);
    FormData1.append('Pera2',this.blogDetails.value.Pera2);
    FormData1.append('Pera3',this.blogDetails.value.Pera3);
    FormData1.append('Pera4',this.blogDetails.value.Pera4);
    FormData1.append('blockquate',this.blogDetails.value.blockquate);
    FormData1.append('BlogImg1', this.img2_FormData as File ? this.img2_FormData as File : this.imagePreview1);
    FormData1.append('BlogImg2', this.img3_FormData as File ? this.img3_FormData as File : this.imagePreview2);
    FormData1.append('FbLink', this.blogDetails.value.FbLink);
    FormData1.append('TwLink', this.blogDetails.value.TwLink);
    FormData1.append('LinkLink', this.blogDetails.value.LinkLink);
    FormData1.append('InstLink', this.blogDetails.value.InstLink);
    FormData1.append('blogTran',this.blogTran)
    
    for(const data of (FormData1 as any).keys()){
      console.log(data, FormData1.get(data));
    }
    this._blog.blogDetailsUpdate(FormData1).then(res=>{
      if(res.state){
        alert("Data updateed");
        this.clear();
      }
    }).catch(err=>{
      console.log(err);
    })
  }


  allot(){
    this.showList= true;    
  }
  clear(){
    this.init();
    this.isVisible = false
  }
}
