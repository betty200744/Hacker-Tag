// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const xhr = new XMLHttpRequest();

function getPath(href) {
  const url = new URL(href);
  return url.pathname.split('/').slice(1, 3).join('/');
}

function getLanguages (path, cb) {
  const url = 'https://api.github.com/repos/' + path + '/languages';
  xhr.addEventListener('load', function () {
    if (this.responseText) {
      console.log(this.responseText);
      const result = JSON.parse(this.responseText);
      cb(Object.keys(result)[0])
    }
  });
  xhr.open('GET', url, true);
  xhr.send();
}

function update() {
  const lists = document.getElementsByClassName('storylink');
  const testLists = Array.prototype.slice.call(lists, 0, 1);
  Array.prototype.map.call(lists, function (l) {
    const path = getPath(l.href);
    getLanguages(path,language => {
      l.nextElementSibling.lastChild.nodeValue = l.nextElementSibling.lastChild.nodeValue + '   |   ' + language;
    });
  })
}
update();
