import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('statement');
    this.statementlist = JSON.parse(data || '');
  }

  statementForm: FormGroup;

  statementlist: any = [];
  // firstname3 = "";
  // lastname3 = "";
  // email3 = "";
  // contact3 = "";
  iseditclicked3 = "no";
  indexselected3 = "";
  issubmitted = false;

  clear3() {
    this.statementForm.reset();
    // this.firstname3 = "";
    // this.lastname3 = "";
    // this.email3 = "";
    // this.contact3 = "";
  }

  submit3() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj3 = {
    //   firstname3: this.firstname3,
    //   lastname3: this.lastname3,
    //   email3: this.email3,
    //   contact3: this.contact3,
    // }

    this.statementlist.push(this.statementForm.value);
    localStorage.setItem('statement', JSON.stringify(this.statementlist));
    this.issubmitted = true;
    this.clear3();
    this.modalRef?.hide();
  }

  edit3(i: any) {
    this.iseditclicked3 = "yes";
    this.indexselected3 = i;
    this.statementForm.patchValue(
      {
        firstname3: this.statementlist[i].firstname3,
        lastname3: this.statementlist[i].lastname3,
        email3: this.statementlist[i].email3,
        // contact3: this.statementlist[i].contact3
      }
    )
  }

  delete3(i: any) {
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
        this.statementlist.splice(i, 1);
        localStorage.setItem('statement', JSON.stringify(this.statementlist));

        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  update3() {
    this.iseditclicked3 = "no";
    this.statementlist[this.indexselected3].firstname3 = this.statementForm.value.firstname3;
    this.statementlist[this.indexselected3].lastname3 = this.statementForm.value.lastname3;
    this.statementlist[this.indexselected3].email3 = this.statementForm.value.email3;
    // this.statementlist[this.indexselected3].contact3 = this.statementForm.value.contact3;
    localStorage.setItem('statement', JSON.stringify(this.statementlist));

    this.clear3();
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
    this.statementForm = this.FormBuilder.group(
      {
        firstname3: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        lastname3: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        email3: ['',Validators.compose([Validators.required, Validators.minLength(3)])]
        // contact3: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}