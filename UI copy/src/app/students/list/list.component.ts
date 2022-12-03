import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  students:any = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getStudents().subscribe((data:any) => {
      this.students = data;
    });
  }

}
