import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxLogUnicornModule} from '../../../ngx-log-unicorn/src/lib/ngx-log-unicorn.module';
import {NGX_LOGUNICORN_CONFIG} from '../../../ngx-log-unicorn/src/lib/injectors/log-unicorn-config.injector';
import {NgxLogUnicornService} from '../../../ngx-log-unicorn/src/lib/ngx-log-unicorn.service';
import {NGX_LOGUNICORN_CONSUMER} from '../../../ngx-log-unicorn/src/lib/injectors/consumers.injector';
import {NgxLogUnicornConfig} from '../../../ngx-log-unicorn/src/lib/interfaces/ngx-log-unicorn-config.interface';

const loggerConfig: NgxLogUnicornConfig = {
  whitelist: ['*'],
  tagFilters: [
    // 'info',
  ],
  bindToWindow: 'logger',
  catchErrors: true
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxLogUnicornModule
  ],
  providers: [
    {
      provide: NGX_LOGUNICORN_CONFIG,
      useValue: loggerConfig
    },
    NgxLogUnicornService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
