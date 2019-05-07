/*
 * Developed by Mannini Andrea (https://github.com/manniniandrea). :bowtie:
 * Last modified 5/3/19 3:36 PM.
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

import {async, TestBed} from '@angular/core/testing';

import {NgxLogUnicornService} from './ngx-log-unicorn.service';
import {NGX_LOGUNICORN_CONFIG} from './injectors/log-unicorn-config.injector';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('NgxLogUnicornService', () => {
  let service: NgxLogUnicornService = null;

  beforeEach(async(() => {

  }));

  it('should not create the service without configs', () => {

    expect(() => {
      TestBed.get(NgxLogUnicornService, null);
    })
      .toThrowError(/^StaticInjectorError/);
  });
  it('should create the service', () => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [],
      providers: [
        {
          provide: NGX_LOGUNICORN_CONFIG,
          useValue: {
            whitelist: ['whitelist-test'],
            blacklist: ['blacklist-test'],
            tagFilters: [
              'tag1',
              'tag2',
              'tag5',
            ]
          }
        }
      ],
    })
      .compileComponents();

    service = TestBed.get(NgxLogUnicornService);
    expect(service)
      .toBeTruthy();
  });
  it('should have whitelist configured', () => {
    expect(service.whiteList)
      .toEqual(['whitelist-test']);
  });
  it('should have blacklist configured', () => {
    expect(service.blackList)
      .toEqual(['blacklist-test']);
  });
  it('should have tagFilters configured', () => {
    expect(service.tagFilters)
      .toEqual([
        'tag1',
        'tag2',
        'tag5',
      ]);
  });
});
