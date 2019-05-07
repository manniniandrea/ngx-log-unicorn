/*
 * Developed by Mannini Andrea (https://github.com/manniniandrea). :bowtie:
 * Last modified 5/3/19 8:20 PM.
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

import {EmptyOrWhildcard} from '../types/empty-or-whildcard.type';

export function uniqueDefaultsList(list: EmptyOrWhildcard, defaultList: string[], defaultType: EmptyOrWhildcard = []): string[] {
  return Array.from(new Set<string>([
    ...defaultList,
    ...Array.from(list || defaultType),
  ]))
    .filter(Boolean);
}


export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} is already loaded. Import it in the AppModule only`);
  }
}

export function* stopWatch() {
  const start = Date.now();
  while (true) {
    yield Date.now() - start;
  }
}
