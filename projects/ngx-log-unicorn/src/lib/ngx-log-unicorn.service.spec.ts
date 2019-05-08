/*
 * Developed by Mannini Andrea (https://github.com/manniniandrea). :bowtie:
 * Last modified 5/8/19 6:31 PM.
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
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {NGX_LOGUNICORN_WINDOW} from './injectors/window.injector';
import {NgxLogUnicornConsumer} from './consumers/ngx-log-unicorn.consumer';
import {NgxLogUnicornMessage} from './interfaces/ngx-log-unicorn-message.interface';
import {NGX_LOGUNICORN_CONSUMER} from './injectors/consumers.injector';


@Injectable()
class NoopConsumer extends NgxLogUnicornConsumer {
  complete(): void {

  }

  error(err: any): void {

  }

  next(value: NgxLogUnicornMessage): void {

  }

  protected _ready(): void {
  }

  protected _loggerBound(): void {
  }
}

class CallerMock {
  notEmpty = true;
}

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
          provide: NGX_LOGUNICORN_WINDOW,
          useValue: window
        },
        {
          provide: NGX_LOGUNICORN_CONSUMER,
          useClass: NoopConsumer,
          multi: true
        },
        {
          provide: NGX_LOGUNICORN_CONFIG,
          useValue: {
            whitelist: ['whitelist-test'],
            blacklist: ['blacklist-test'],
            catchErrors: true,
            bindToWindow: 'logger',
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
  it('#log should call tag with params with objects', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.log(new CallerMock(), 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual([new CallerMock(), ['log'], 'ciao!']);
  });
  it('#log should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.log('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['log'], 'ciao!']);
  });
  it('static #log should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    NgxLogUnicornService.log('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['log'], 'ciao!']);
  });
  it('#info should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.info('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['info'], 'ciao!']);
  });
  it('static #info should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    NgxLogUnicornService.info('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['info'], 'ciao!']);
  });
  it('#warn should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.warn('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['warn'], 'ciao!']);
  });
  it('static #warn should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    NgxLogUnicornService.warn('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['warn'], 'ciao!']);
  });
  it('#error should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.error('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['error'], 'ciao!']);
  });
  it('static #error should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    NgxLogUnicornService.error('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['error'], 'ciao!']);
  });
  it('#debug should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.debug('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['debug'], 'ciao!']);
  });
  it('static #debug should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    NgxLogUnicornService.debug('group', 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['debug'], 'ciao!']);
  });
  it('#network should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    service.network('group', ['altrotag'], 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['network', 'altrotag'], 'ciao!']);
  });
  it('static #network should call tag with params', () => {
    const tag = spyOn(service, 'tag').and.callThrough();
    NgxLogUnicornService.network('group', ['altrotag'], 'ciao!');
    expect(tag).toHaveBeenCalled();
    expect(tag.calls.mostRecent().args).toEqual(['group', ['network', 'altrotag'], 'ciao!']);
  });
});
