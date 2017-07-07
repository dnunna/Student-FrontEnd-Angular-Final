import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-class-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css']
})
export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  major_class: object = {};
  majors: any[];
  classes: any[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major_class", +params['id']))
      .subscribe(major_class => this.major_class = major_class);
  }

  getMajors() {
    this.dataService.getRecords("major")
      .subscribe(
        majors => this.majors = majors,
        error =>  this.errorMessage = <any>error);
  }
    getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMajors();
    this.getClasses();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveMajorClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("major_class", this.major_class, id)
          .subscribe(
            major_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major_class", this.major_class)
          .subscribe(
            major_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.major_class = {};
    
  }

  byMajorId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.major_id === item2.major_id;
    }
  }

  byClassId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.class_id === item2.class_id;
    }
  }

}


