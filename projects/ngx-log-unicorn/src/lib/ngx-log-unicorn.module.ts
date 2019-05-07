/*
 * Developed by Mannini Andrea (https://github.com/manniniandrea). :bowtie:
 * Last modified 5/3/19 6:19 PM.
 *
 * MIT License
 *
 * Copyright (c) 2019 Mannini Andrea (https://github.com/manniniandrea)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 */

import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {throwIfAlreadyLoaded} from './utils/utils';
import {NGX_LOGUNICORN_CONFIG} from './injectors/log-unicorn-config.injector';
import {NGX_LOGUNICORN_WINDOW} from './injectors/window.injector';
import {NgxLogUnicornConfig} from './interfaces/ngx-log-unicorn-config.interface';


export function windowFactory() {
  return window;
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  exports: []
})
export class NgxLogUnicornModule {
  constructor(@Optional() @SkipSelf() parentModule: NgxLogUnicornModule) {
    throwIfAlreadyLoaded(parentModule, 'NgxLogUnicornModule');
  }

  /**
   * Make the service and interceptor available for the current (root) module, it is recommended that this method
   * is only called from the root module otherwise multiple instances of the service and interceptor will be created
   * (one for each module it is called in)
   */
  public static forRoot(config: Partial<NgxLogUnicornConfig>): ModuleWithProviders {
    return {
      ngModule: NgxLogUnicornModule,
      providers: [
        {
          provide: NGX_LOGUNICORN_WINDOW,
          useFactory: windowFactory
        },
        {
          provide: NGX_LOGUNICORN_CONFIG,
          useValue: config
        }
      ],
    };
  }
}
