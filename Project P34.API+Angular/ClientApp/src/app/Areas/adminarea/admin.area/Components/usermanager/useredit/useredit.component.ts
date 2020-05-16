import { Component, OnInit } from '@angular/core';
import { UsermanagerService } from '../../../service/usermanager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UserItem } from '../../../Models/useritem.model';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  constructor(
    private userService: UsermanagerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }

  model: UserItem;
  userId: string;
  isError: boolean;



  submitForm () {
    this.spinner.show();

    if (this.model.email === null) {
      this.notifier.notify('error', 'Please, enter email!');
      this.isError = true;
    }
    if (this.model.fullName === null) {
      this.notifier.notify('error', 'Please, enter full name!');
      this.isError = true;
    }
    if (this.model.phone === null) {
      this.notifier.notify('error', 'Please, enter phone!');
      this.isError = true;
    }
    if (!this.validateEmail(this.model.email)) {
      this.notifier.notify('error', 'Email is not correct format!');
      this.isError = true;
    }


    if (this.isError === false) {
      this.userService.editUser(this.userId, this.model).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'User edited!');
            this.router.navigate(['/admin-panel/user-manager']);
          }
        },
        (error) => {
          this.notifier.notify('error', 'Server error');
        }
      );
    }

    this.isError = false;
    this.spinner.hide();
  }


  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  ngOnInit() {
    this.spinner.show();
    this.isError = false;
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.userService.getUser(this.userId).subscribe(
      (user: UserItem) => {
        this.model = user;
        this.spinner.hide();
        console.log(this.model);
      }
    );

  }
}
