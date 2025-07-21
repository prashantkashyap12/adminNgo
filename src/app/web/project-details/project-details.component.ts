import { Component } from '@angular/core';
import { url } from '../../interface/api_config';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProjectService } from '../service/project.service';
import { HttpClientModule } from '@angular/common/http';
import moment from 'moment';


@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AutocompleteLibModule, HttpClientModule],
  providers: [ProjectService],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

    constructor(private _fb: FormBuilder, private _proj: ProjectService) { }
      ngOnInit() {
      this.clear();    
    }

    loader:any = false;
    private baseUrl = new url().value;
    ProjectDetails!:FormGroup;
    isVisible:boolean=false;
    updateAct:boolean=false;
    
    imagePreview1:any="";
    imagePreview2:any="";
    imagePreview3:any="";
      
    showList:boolean=true
    blogListHding:any="";
    data:any = []
    keyword ="Head";
    projectTran: any;

  imgIformA:any;
  imgIform1(file: any) {
    if (file.target.files.length == 1) {
      this.imgIformA = file.target.files[0];
    }
  }
  imgIformB: any;
  imgIform2(file: any) {
    if (file.target.files.length == 1) {
      this.imgIformB = file.target.files[0];
    }
  }
  imgIformC:any;
  imgIform3(file: any) {
    if (file.target.files.length == 1) {
      this.imgIformC = file.target.files[0];
    }
  }

  Init(){
    this.ProjectDetails = this._fb.group({
      date: [moment(new Date()).format('DD-MM-YYYY')],
      img1: [null],
      img2: [null],
      img3: [null],
      head1: ['', [Validators.required]],
      pera1: ['', [Validators.required]],
      pera11: ['', [Validators.required]],
      head2: ['', [Validators.required]],
      pera2: ['', [Validators.required]],
      head3: ['', [Validators.required]],
      pera3: ['', [Validators.required]],
      cat: ['', [Validators.required]],
      auth: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    })
    this.isVisible = false;
  }

  selectEvent(evt: any) {
    this.projectTran = evt.ProjTran;
    this._proj.getProjectDetails(this.projectTran).subscribe((res: any) => {
      this.patchData(res.results[0])
    })
  }

  patchData(data: any) {
    this.isVisible = true;
    this.imagePreview1 = this.baseUrl + data.Img1;
    this.imagePreview2 = this.baseUrl + data.Img2;
    this.imagePreview3 = this.baseUrl + data.Img3;
    this.ProjectDetails.patchValue({
      date: data.Date,
      head1: data.Head1,
      pera1: data.Pera1,
      pera11: data.Pera11,
      head2: data.Head2,
      pera2: data.Pera2,
      head3: data.Head3,
      pera3: data.Pera3,
      cat: data.Cat,
      auth: data.Auth,
      tag: data.Tag,
      cost: data.Cost,
      img1: data.Img1,
      img2: data.Img2,
      img3: data.Img3,
    })
  }

      
  onSubmit() {
    this.loader = true;
    const formDatas = new FormData();
    formDatas.append('projDetails1[0].projectTran', this.projectTran);
    formDatas.append('projDetails1[0].img1', this.imgIformA as File);
    formDatas.append('projDetails1[0].img2', this.imgIformB as File);
    formDatas.append('projDetails1[0].img3', this.imgIformC as File);

    formDatas.append('projDetails2[0].projectTran', this.projectTran);
    formDatas.append('projDetails2[0].head1', this.ProjectDetails.value.head1);
    formDatas.append('projDetails2[0].pera1', this.ProjectDetails.value.pera1);
    formDatas.append('projDetails2[0].pera11', this.ProjectDetails.value.pera11);
    formDatas.append('projDetails2[0].head2', this.ProjectDetails.value.head2);
    formDatas.append('projDetails2[0].pera2', this.ProjectDetails.value.pera2);
    formDatas.append('projDetails2[0].head3', this.ProjectDetails.value.head3);
    formDatas.append('projDetails2[0].pera3', this.ProjectDetails.value.pera3);

    formDatas.append('projDetails3[0].projectTran', this.projectTran);
    formDatas.append('projDetails3[0].cat', this.ProjectDetails.value.cat);
    formDatas.append('projDetails3[0].auth', this.ProjectDetails.value.auth);
    formDatas.append('projDetails3[0].tag', this.ProjectDetails.value.tag);
    formDatas.append('projDetails3[0].cost', this.ProjectDetails.value.cost);
    formDatas.append('projDetails3[0].date', moment(this.ProjectDetails.value.date).format('YYYY-MM-DD'));
    if (true) {
      formDatas.append('ProjTran', this.projectTran);
      this._proj.updateProjectDetails(formDatas).subscribe(res => {
        res.state ? alert("Project Updated Successfully") : alert("Project Not Updated");
        this.allot();
        this.Init();
        this.updateAct = true;
        this.isVisible = false;
        this.loader = false;
      })
    }
  }
  allot() {
    this._proj.getProjectsLs().subscribe((res: any) => {
      this.data = res.res;
    })
  }
  clear() {
    this.allot();
    this.Init();
  }
}

