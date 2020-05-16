import { Component, OnInit } from '@angular/core';
import { UserItem } from '../../Models/useritem.model';
import { UsermanagerService } from '../../service/usermanager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { ApiResult } from 'src/app/Models/result.model';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {

  constructor(private userService: UsermanagerService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }




  listOfData: UserItem[] = [];
  searchResult: UserItem[] = [];
  searchteaxt: string;


  deleteUser(id: string){
    this.spinner.show();
    this.userService.removeUser(id).subscribe(
      (data: ApiResult) =>{
        if(data.status === 200)
        {
          this.notifier.notify('Success', 'User removed');
          this.listOfData = this.listOfData.filter(t=>t.id !==id);
          this.searchResult = this.searchResult.filter(t=>t.id !==id);

        }
        else{
          for(var i = 0; i< data.errors;i++)
          this.notifier.notify('error', data.errors[i] )
        }
        this.spinner.hide();
      }
    );
  }

  ngOnInit(): void {
    this.spinner.show();

    this.userService.getallusers().subscribe(
      (data: UserItem[]) => {
        this.listOfData = data;
        this.searchResult = data;

        this.spinner.hide();
      }
    );
 
    
    
  }
  search()
    {
      this.searchResult = this.listOfData.filter(t=> t.fullName.includes(this.searchteaxt) ||  t.email.includes(this.searchteaxt))
    }
  
}
