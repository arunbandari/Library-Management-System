import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentId:any;
  title:string = 'Add Student';
  studentForm!: UntypedFormGroup;
  mode:string = 'create';
  constructor(private fb: UntypedFormBuilder, private api: ApiService, private route: ActivatedRoute) {
    this.studentForm = this.fb.group({
      student_id: [null],
      student_name: [null, [Validators.required]],
      student_department_id: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.studentId = studentId;
    this.api.getStudentById(this.studentId).subscribe((student:any) => {
      if (!student) return;
      this.mode = 'update';
      this.title = 'Update Student';
      student.student_department_id = `${student.student_department_id}`;
      this.studentForm.patchValue(student);
      console.log(this.studentForm.value)
    });
  }

  submit() {
    if (this.mode === 'create') {
      this.api.addStudent(this.studentForm.value).subscribe((data) => {
        console.log(data);
        alert('A new student has been added!');
        this.studentForm.reset();
      });
    } else {
      this.api.updateStudent(this.studentForm.value).subscribe((data:any) => {
        console.log(data);
        alert('The student details have been updated!');
      });
    }
  }
}
