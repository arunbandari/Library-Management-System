import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  facultyId:any;
  title:string = 'Add Faculty';
  facultyForm!: UntypedFormGroup;
  mode:string = 'create';
  constructor(private fb: UntypedFormBuilder, private api: ApiService, private route: ActivatedRoute) {
    this.facultyForm = this.fb.group({
      faculty_id: [null],
      faculty_name: [null, [Validators.required]],
      faculty_department_id: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const facultyId = this.route.snapshot.paramMap.get('id');
    this.facultyId = facultyId;
    this.api.getFacultyById(this.facultyId).subscribe((faculty:any) => {
      if (!faculty) return;
      this.mode = 'update';
      this.title = 'Update Faculty';
      faculty.faculty_department_id = `${faculty.faculty_department_id}`;
      this.facultyForm.patchValue(faculty);
    });
  }

  submit() {
    if (this.mode === 'create') {
      this.api.addFaculty(this.facultyForm.value).subscribe((data:any) => {
        console.log(data);
        alert('A new faculty has been added!');
        this.facultyForm.reset();
      });
    } else {
      this.api.updateFaculty(this.facultyForm.value).subscribe((data:any) => {
        console.log(data);
        alert('The faculty details have been updated!');
      });
    }
  }

}
