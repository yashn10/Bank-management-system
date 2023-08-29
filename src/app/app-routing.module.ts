import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { StatementComponent } from './statement/statement.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'employee',
    component:EmployeeComponent
  },
  {
    path:'staff',
    component:StaffComponent
  },
  {
    path:'statement',
    component:StatementComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
