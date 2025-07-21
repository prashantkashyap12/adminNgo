import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../../interface/api_config';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../service/project.service';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, AutocompleteLibModule],
  providers: [ProjectService],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  loader:any = false;
  constructor(private _fb: FormBuilder, private _projSer: ProjectService){}
  ngOnInit(){
    this.Init();
    this.allot();
  }
  private baseUrl = new url().value;
  ProjectForm!:FormGroup;
  keyword ="Head";
  data:any = [  ]
  showList:boolean = true;
  updateAct:boolean = true;

  imagePreview:any = null;
  ProjTran:any;

  Init(){
    this.ProjectForm = this._fb.group({
      imgpath: ['', Validators.required],
      head: ['', Validators.required],
      pera: ['', Validators.required],
      path: ['', Validators.required],
    })
  }


  // File Upload
  IfromFile: any;
  fileUpdate(file: any) {
    if (file.target.files.length == 1) {
      this.IfromFile = file.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
    }
  }



  // autoComplete 
  selectEvent(data: any) {
    this.updateAct = false;
    this.ProjTran = data.ProjTran;
    this.datapatch(data);
  }
  datapatch(data: any) {
    this.imagePreview = this.baseUrl+data.Imgpath;
    this.ProjectForm.patchValue({
      head: data.Head,
      pera: data.Pera,
      path: data.Path,
      imgpath: data.Imgpath,
    })
  }
  

  onSubmit() {
    this.loader = true;
    const formdata = new FormData();
    formdata.append('ImgPath', this.IfromFile as File);
    formdata.append('Head', this.ProjectForm.value.head);
    formdata.append('Pera', this.ProjectForm.value.pera);
    formdata.append('Path', this.ProjectForm.value.path);
    if (this.updateAct) {
      this._projSer.AddProjectLs(formdata).subscribe(res => {
        res.state ? alert("Project Added Successfully") : alert("Project Not Added");
        this.allot();
        this.Init();
        this.updateAct = true;
        this.loader = false;
      })
    } else {
      formdata.append('projectTran', this.ProjTran);
      for (let data of (formdata as any).keys()) {
        console.log(data, formdata.get(data));
      }
      this._projSer.updateProjectLs(formdata).subscribe(res => {
        res.state ? alert("Project Updated Successfully") : alert("Project Not Updated");
        this.fresh();
        this.loader = false;
      })
    }
  }

  delet() {
    this.loader = true;
    this._projSer.deleteProjectLs(this.ProjTran).subscribe(res => {
      if (res.state) {
        this.ProjectForm.reset();
        this.fresh();
        alert("Project Deleted Successfully");
        this.loader = false;
      }
    })
  }

  allot() {
    this._projSer.getProjectsLs().subscribe(res => {
      this.data = res.res;
    })
  }
  fresh() {
    this.allot();
    this.ProjectForm.reset();
    this.IfromFile = null;
    this.imagePreview = null;
    this.ProjTran = null;
    this.updateAct = true;
    this.showList = true;
  }
}

