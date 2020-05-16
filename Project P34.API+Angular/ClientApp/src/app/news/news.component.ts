import { Component, OnInit } from '@angular/core';
import { UsermanagerService } from '../Areas/adminarea/admin.area/service/usermanager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NewsModel } from '../Models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(
    private userService: UsermanagerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }

  listOfData : NewsModel[] = [];


  model: NewsModel;
  newsId: number;
  isError: boolean;

  ngOnInit() {
    this.spinner.show();
    this.isError = false;
    
    this.userService.getallnews().subscribe
    (
      (AllNews: NewsModel[])=>{
        this.listOfData = AllNews;
        this.spinner.hide();
      }
    )

  }

}
