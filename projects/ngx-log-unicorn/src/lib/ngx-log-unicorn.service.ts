/*
 * Developed by Mannini Andrea (https://github.com/manniniandrea). :bowtie:
 * Last modified 5/3/19 8:24 PM.
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

import {Inject, Injectable, Optional} from '@angular/core';
import {EmptyOrWhildcard} from './types/empty-or-whildcard.type';
import {uniqueDefaultsList} from './utils/utils';
import {Subject} from 'rxjs';
import {NGX_LOGUNICORN_CONFIG} from './injectors/log-unicorn-config.injector';
import {NgxLogUnicornMessage} from './interfaces/ngx-log-unicorn-message.interface';
import {NgxLogUnicornConsumer} from './consumers/ngx-log-unicorn.consumer';
import {NGX_LOGUNICORN_WINDOW} from './injectors/window.injector';
import {NGX_LOGUNICORN_CONSUMER} from './injectors/consumers.injector';
import {NgxLogUnicornConfig} from './interfaces/ngx-log-unicorn-config.interface';

declare global {
  interface Window {
    __LOG_UNICORN_BIND_NAME: string;
  }
}

/** @dynamic */
@Injectable({
  providedIn: 'root'
})
export class NgxLogUnicornService {

  private static _staticRef: NgxLogUnicornService = null;
  protected _defaultWhitelist: string[] = [];
  protected _defaultBlacklist: string[] = [];
  protected _tagFilters: string[] = null;
  protected _whitelist: string[] = null;
  protected _blacklist: string[] = null;
  private _events = new Subject<NgxLogUnicornMessage>();

  constructor(@Inject(NGX_LOGUNICORN_CONFIG) protected _config: NgxLogUnicornConfig,
              @Optional() @Inject(NGX_LOGUNICORN_WINDOW) protected _window: Window,
              @Optional() @Inject(NGX_LOGUNICORN_CONSUMER) protected _consumers: NgxLogUnicornConsumer[]) {
    this._configure(this._config);
    this._configureConsumers(this._consumers);
    NgxLogUnicornService._staticRef = this;
  }


  public get blackList() {
    return this._blacklist;
  }

  public get whiteList() {
    return this._whitelist;
  }
  public get tagFilters() {
    return this._tagFilters;
  }

  public static nameForCaller(caller) {
    let callerName = 'Unknown';
    if (typeof caller === 'string') {
      callerName = caller;
    } else if (caller && caller.constructor && caller.constructor.name) {
      callerName = caller.constructor.name;
    }
    return callerName;
  }

  public static tag<T>(caller: (new (...args: any[]) => T) | T, tags: string[], ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, tags, ...args);
    }
  }

  public static debug<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, ['debug'], ...args);
    }
  }

  public static log<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, ['log'], ...args);
    }
  }

  public static warn<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, ['warn'], ...args);
    }
  }

  public static info<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, ['info'], ...args);
    }
  }

  public static error<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, ['error'], ...args);
    }
  }

  public static network<T>(caller: (new (...args: any[]) => T) | T, tags: string[], ...args: any[]) {
    if (NgxLogUnicornService._staticRef) {
      NgxLogUnicornService._staticRef.tag(caller, ['network'].concat(tags), ...args);
    }
  }

  public tag<T>(caller: (new (...args: any[]) => T) | T, tags: string[] = ['info'], ...args: any[]) {
    const group: string = NgxLogUnicornService.nameForCaller(caller);

    if (this._canLog(group, tags)) {
      this._events.next({
        id: Math.random().toString(36).substring(7),
        group,
        tags,
        args,
        tms: new Date()
      });
    }
  }

  public log<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    this.tag(caller, ['info'], ...args);
  }

  public warn<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    this.tag(caller, ['warn'], ...args);
  }

  public info<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    this.tag(caller, ['info'], ...args);
  }

  public error<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    this.tag(caller, ['error'], ...args);
  }

  public debug<T>(caller: (new (...args: any[]) => T) | T, ...args: any[]) {
    this.tag(caller, ['debug'], ...args);
  }

  public network<T>(caller: (new (...args: any[]) => T) | T, tags: string[], ...args: any[]) {
    this.tag(caller, ['network'].concat(tags), ...args);
  }

  private _configureConsumers(consumers: NgxLogUnicornConsumer[] = []) {
    if (Array.isArray(consumers)) {
      for (const consumer of consumers) {
        consumer.bindToLogger(this);
        this._events.subscribe(consumer);
      }
    }
  }

  private _canLog(group, tags: string[] = []): boolean {
    return !this._isFiltered(tags) &&
      (this._isGroupWhitelisted(group) && !this._isGroupBlacklisted(group));
  }

  private _isFiltered(tags: string[]) {
    const b = new Set<string>(this._tagFilters);
    const arrayDiff = new Set(
      tags.filter(x => !b.has(x)));
    return arrayDiff.size === 0;
  }

  private _isGroupBlacklisted(group) {
    return ((this._blacklist.length && this._blacklist[0] === '*') || this._blacklist.indexOf(group) >= 0);
  }

  private _isGroupWhitelisted(group) {
    return (this._whitelist.length === 0 || this._whitelist[0] === '*' || this._whitelist.indexOf(group) >= 0);
  }


  private _configureWhitelist(whitelist: EmptyOrWhildcard): void {
    this._whitelist = uniqueDefaultsList(whitelist, this._defaultWhitelist, '*');
  }

  private _configureBlacklist(blacklist: EmptyOrWhildcard): void {
    this._blacklist = uniqueDefaultsList(blacklist, this._defaultBlacklist);
  }

  private _bindToWindow(bindToWindow) {
    if (bindToWindow && this._window) {
      this._window[bindToWindow] = this;
      this._window.__LOG_UNICORN_BIND_NAME = bindToWindow;
      // (window as any)[bindToWindow] = this;
      // (window as any).__LOG_UNICORN_BIND_NAME = bindToWindow;
    }
  }


  private _configureTagFilters(filters: string[] = []) {
    this._tagFilters = filters || [];
  }

  private _forward(caller, tags) {
    return (...args: any[]) => {
      this.tag(caller, tags, ...args);
      return false;
    };
  }

  private _catchErrors() {
    if (window) {
      window.onerror = this._forward('exception', ['exception']);
      window.addEventListener('error', this._forward('exception', ['exception']));
      window.addEventListener('unhandledrejection', this._forward('exception', ['exception', 'unhandledrejection']));
    }
  }

  private _configure({
                       whitelist,
                       blacklist,
                       bindToWindow,
                       tagFilters,
                       catchErrors
                     }: NgxLogUnicornConfig) {
    this._configureWhitelist(whitelist);
    this._configureBlacklist(blacklist);
    this._configureTagFilters(tagFilters);
    this._bindToWindow(bindToWindow);
    if (catchErrors) {
      this._catchErrors();
    }
  }
}
