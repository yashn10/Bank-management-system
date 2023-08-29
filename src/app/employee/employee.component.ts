import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('employee');
    this.employeelist = JSON.parse(data || '');
  }

  employeeForm: FormGroup;
  employeelist: any = [];
  // firstname = "";
  // lastname = "";
  // email = "";
  // contact = "";
  iseditclicked = "no";
  indexselected = "";
  issubmitted = false;

  clear() {
    this.employeeForm.reset();
    // this.firstname = "";
    // this.lastname = "";
    // this.email = "";
    // this.contact = "";
  }

  submit() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj = {
    //   firstname: this.firstname,
    //   lastname: this.lastname,
    //   email: this.email,
    //   contact: this.contact,
    // }

    this.employeelist.push(this.employeeForm.value);
    localStorage.setItem('employee', JSON.stringify(this.employeelist));
    this.issubmitted = true;
    this.clear();
    this.modalRef?.hide();
  }

  edit(i: any) {
    this.iseditclicked = "yes";
    this.indexselected = i;
    this.employeeForm.patchValue(
      {
        firstname: this.employeelist[i].firstname,
        lastname: this.employeelist[i].lastname,
        email: this.employeelist[i].email,
        // contact: this.employeelist[i].contact
      }
    )
  }

  delete(i: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeelist.splice(i, 1);
        localStorage.setItem('employee', JSON.stringify(this.employeelist));
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  update() {
    this.iseditclicked = "no";
    this.employeelist[this.indexselected].firstname = this.employeeForm.value.firstname;
    this.employeelist[this.indexselected].lastname = this.employeeForm.value.lastname;
    this.employeelist[this.indexselected].email = this.employeeForm.value.email;
    // this.employeelist[this.indexselected].contact = this.employeeForm.value.contact;
    localStorage.setItem('employee', JSON.stringify(this.employeelist));

    this.clear();
    this.modalRef?.hide();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private FormBuilder: FormBuilder) {
    this.employeeForm = this.FormBuilder.group(
      {
        firstname: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        lastname: ['',Validators.compose([Validators.required, Validators.minLength(2)])],
        email: ['',Validators.compose([Validators.required, Validators.minLength(2)])]
        // contact: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}