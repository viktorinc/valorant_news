import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { NewsModel } from 'src/app/Models/news.model';
import { UsermanagerService } from '../../service/usermanager.service';
import { ApiResult } from 'src/app/Models/result.model';
import { Title } from '@angular/platform-browser';
import { NewsModeld } from '../../Models/newsmodeld';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private notifier: NotifierService,
    private userService: UsermanagerService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }


    
  listOfData: NewsModel[] = [];
  searchResult: NewsModel[] = [];
  searchteaxt: string;

  model = new NewsModeld();
  isError: boolean;


  deleteNews(id: number){
    this.spinner.show();
    this.userService.removeNews(id).subscribe(
      (data: ApiResult) =>{
        if(data.status === 200)
        {
          this.notifier.notify('Success', 'News removed');
          this.listOfData = this.listOfData.filter(t=>t.Id !==id);
          this.searchResult = this.searchResult.filter(t=>t.Id !==id);

        }
        else{
          for(var i = 0; i< data.errors;i++)
          this.notifier.notify('error', data.errors[i] )
        }
        this.ngOnInit();
        this.spinner.hide();
      }
    );
  }


  ngOnInit() {
    this.isError = false;

    this.spinner.show();

    this.userService.getallnews().subscribe(
      (data: NewsModel[]) => {
        this.listOfData = data;
        this.searchResult = data;
        console.log(data);
        this.spinner.hide();
      }
    );

  }
  onSubmit() {
    this.spinner.show();

    if (this.model.Title === null) {
      this.notifier.notify('error', 'Please, enter title!');
      this.isError = true;
    }
    if (this.model.Subtitle === null) {
      this.notifier.notify('error', 'Please enter subtitle!');
      this.isError = true;
    }

    if (this.model.Text === null) {
      this.notifier.notify('error', 'Please, enter text!');
      this.isError = true;
    }
    if (this.model.ImageUrl === null) {
      this.notifier.notify('error', 'Please, enter image!');
      this.isError = true;
    }
    if (this.model.Likes === null) {
      this.notifier.notify('error', 'Please, enter Likes!');
      this.isError = true;
    }

    if (this.isError === false) {
      this.apiService.AddNews(this.model).subscribe(
        data => {
          console.log(data);
          if (data.status === 200) {
            this.spinner.hide();
            this.notifier.notify('success', 'news added!');
          } else {
            // console.log(data.errors);
            for (let i = 0; i < data.errors.length; i++) {
              this.notifier.notify('error', data.errors[i]);
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 2500);
          }
        },
        errors => {
          console.log(errors);
        });
      } else {
        setTimeout(() => {
          this.spinner.hide();
          this.isError = false;
        }, 2500);
      }
  }
  search()
  {
    this.searchResult = this.listOfData.filter(t=> t.Title.includes(this.searchteaxt) ||  t.Subtitle.includes(this.searchteaxt))
  }


}
