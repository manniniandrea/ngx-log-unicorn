/*
 * Developed by Mannini Andrea (https://github.com/manniniandrea). :bowtie:
 * Last modified 5/8/19 5:25 PM.
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

import {async} from '@angular/core/testing';
import * as utils from './utils';

export const spyOnFunction = <T>(obj: T, func: keyof T) => {
  const spy = jasmine.createSpy(func as string);
  spyOnProperty(obj, func, 'get').and.returnValue(spy);

  return spy;
};

describe('Utils', () => {


  beforeEach(async(() => {

  }));
  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('calling throwIfAlreadyLoaded with null value should not generate errors', () => {
    const throwIfAlreadyLoaded = spyOnFunction(utils, 'throwIfAlreadyLoaded');
    throwIfAlreadyLoaded(null, 'pkg-name');
    expect(throwIfAlreadyLoaded).toHaveBeenCalled();
  });
  it('calling throwIfAlreadyLoaded with non-null value should throw error', () => {
    expect(() => {
      utils.throwIfAlreadyLoaded({prop: true}, 'pkg-name');
    }).toThrowError('pkg-name is already loaded. Import it in the AppModule only');
  });
  it('first value to be 0', () => {
    const watch = utils.stopWatch();
    expect(watch.next().value).toBe(0);
  });
  it('second value after 1000ms sleep to be ~= 1000', () => {
    jasmine.clock().mockDate(new Date());
    const watch = utils.stopWatch();
    watch.next();
    jasmine.clock().tick(1000);
    expect(watch.next().value).toBe(1000);
  });
});
