import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {
  faculty:any = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getFaculty().subscribe((data:any) => {
      this.faculty = data;
    });
  }

}
