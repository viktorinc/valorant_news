import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserItem } from '../Models/useritem.model';
import { ApiResult } from 'src/app/Models/result.model';
import { Observable } from 'rxjs/internal/Observable';
import { NewsModel } from '../../../../Models/news.model';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {

constructor(private http: HttpClient) { }

baseUrl = '/api/usermanager';

getallusers()
{
  return this.http.get(this.baseUrl);
}

getallnews()
{
  return this.http.get('api/news');
}

getUser(id:string)
{
  return this.http.get(this.baseUrl + '/' + id);
}

getNews(id:number)
{
  return this.http.get('api/news/' + id);
}

editUser(id: string, model: UserItem): Observable<ApiResult> {
  return this.http.post<ApiResult>(this.baseUrl + '/editUser/' + id, model);
}

editNews(id: number, model: NewsModel): Observable<ApiResult> {
  return this.http.post<ApiResult>('api/news/editnews/' + id, model);
}

removeNews(id: number)
{
  return this.http.post('api/news/removenews/' + id, id);
}

removeUser(id: string)
{
  return this.http.post(this.baseUrl+'/removeuser/' + id, id);
}
}
