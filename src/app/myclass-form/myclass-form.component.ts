import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-myclass-form',
  templateUrl: './myclass-form.component.html',
  styleUrls: ['./myclass-form.component.css']
})
export class MyclassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  myclass: object = {};
  instructors: any[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(myclass => this.myclass= myclass);
  }

  getInstructors() {
    this.dataService.getRecords("instructor")
      .subscribe(
        instructors => this.instructors = instructors,
        error =>  this.errorMessage = <any>error);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getInstructors();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveMyclass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("class", this.myclass, id)
          .subscribe(
            myclass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("class", this.myclass)
          .subscribe(
            myclass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.myclass = {};
    
  }

  byinstructor_id(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.instructor_id === item2.instructor_id;
    }
  }

}

