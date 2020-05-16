import { Component, OnInit } from '@angular/core';
import { NewsModel } from '../../../../../../Models/news.model';
import { UsermanagerService } from '../../../service/usermanager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResult } from 'src/app/Models/result.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-newsedit',
  templateUrl: './newsedit.component.html',
  styleUrls: ['./newsedit.component.css']
})
export class NewseditComponent implements OnInit {

  constructor(
    private userService: UsermanagerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }


  model: NewsModel;
  userId: number;
  isError: boolean;



  submitForm () {
    this.spinner.show();

    if (this.model.Title === null) {
      this.notifier.notify('error', 'Please, enter email!');
      this.isError = true;
    }
    if (this.model.Subtitle === null) {
      this.notifier.notify('error', 'Please, enter full name!');
      this.isError = true;
    }
    if (this.model.Text === null) {
      this.notifier.notify('error', 'Please, enter phone!');
      this.isError = true;
    }



    if (this.isError === false) {
      this.userService.editNews(this.userId, this.model).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'news edited!');
            this.router.navigate(['/admin-panel']);
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
    this.userService.getNews(this.userId).subscribe(
      (user: NewsModel) => {
        this.model = user;
        this.spinner.hide();
        console.log(this.model);
      }
    );

  }
}
