import {Component} from '@angular/core';
import {NgxLogUnicornService} from '../../../ngx-log-unicorn/src/lib/ngx-log-unicorn.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-log-unicorn-tester';

  constructor(protected _http: HttpClient, protected _logger: NgxLogUnicornService) {
    console.log('AppComponent', this._logger);
  }

  networkCall() {
    this._http.get('https://my-json-server.typicode.com/typicode/demo/db')
      .subscribe({
        next: (data) => {
          console.log('Data received', data);
        },
        error: (errors) => {
          console.error(errors);
        }
      });
  }
}
