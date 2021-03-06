import { Component, Inject , ViewChild , OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatTable } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

import { PlansService, Post } from '../services/plans.service';

export interface UsersData {
  topic: string;
  category: string;
  description: string;
}

const ELEMENT_DATA: UsersData[] = [
  {topic: 'Desc1', category: 'Bug', description: 'Admin'},
  {topic: 'Desc2', category: 'Question', description: 'User'}
];

@Component ({
  selector: 'product-section',
  templateUrl: 'product.component.html'
})
export class ProductSection implements OnInit { 
  
  displayedColumns: string[] = ['topic', 'description', 'category'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
 
  constructor(public dialog: MatDialog, private plansService: PlansService) {}
  
  topic: string;
  category: string;
  description: string;
 
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTopic, {
      data: {topic: this.topic, description: this.description, category: this.category}
    })
    dialogRef.afterClosed().subscribe((result: any) => this.addRowData(result.data));       
  }
  addRowData(row_obj){    
    this.dataSource.push({
      topic: row_obj.topic,
      category: row_obj.category,
      description: row_obj.description
    });
    this.table.renderRows(); 
  }
  posts: Post[];

  ngOnInit() {  
     this.plansService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    });
  }
}
@Component({
  selector: 'add-discussion-section',
  templateUrl: 'add.discussion.html',
})
export class AddTopic {

  action:string;
  dataSource:any;

  constructor(
    public dialogRef: MatDialogRef<AddTopic>,     
  @Inject(MAT_DIALOG_DATA) public dataSourse: UsersData) {
    console.log(dataSourse);
    this.dataSource = {...dataSourse};
    this.action = this.dataSource.action;
  }
  doAction(){
    this.dialogRef.close({event:this.action,data:this.dataSource});
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
} 
