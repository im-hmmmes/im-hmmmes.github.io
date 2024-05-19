/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7cdaf991'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "2024/05/18/metamask/index.html",
    "revision": "c059b46493556756ecc59bf05d7672d9"
  }, {
    "url": "2024/05/19/hello-world/index.html",
    "revision": "c14aab76f6f5dd129af48ad1f2737a6c"
  }, {
    "url": "2024/05/19/利用Honeygain輕鬆賺取被動收入：詳細介紹與使用指南/index.html",
    "revision": "a70cef0bf6b39365f81409ad129b0d9b"
  }, {
    "url": "404.html",
    "revision": "5e69796bcc461fa92bd036ddff6cd48a"
  }, {
    "url": "about/index.html",
    "revision": "aa8adca8ea348cbef89728cab35bb771"
  }, {
    "url": "archives/2024/05/index.html",
    "revision": "c554457bddc6b2f918bfee4277ed5830"
  }, {
    "url": "archives/2024/index.html",
    "revision": "2299176795d66fc535d79b3d8b9c8971"
  }, {
    "url": "archives/index.html",
    "revision": "bebf510ba7a5c0841be5aecbe73981a7"
  }, {
    "url": "bundle.js",
    "revision": "27c0af32fc510b82f7461783cd8af07b"
  }, {
    "url": "categories/index.html",
    "revision": "628fe7e3e52e74295c8d715313cf0e60"
  }, {
    "url": "categories/wrote-by-ai/index.html",
    "revision": "2a23447aa37cec94d7ae53ceaa322ff3"
  }, {
    "url": "css/gitalk.css",
    "revision": "5a5838f7c265b7fe37eafebbe7972d03"
  }, {
    "url": "css/hbe.style.css",
    "revision": "b58c8d0c49fb0353770064c92f73518b"
  }, {
    "url": "css/highlight-dark.css",
    "revision": "e0e6d0077f7b4c2b16d8cfaec2af528b"
  }, {
    "url": "css/highlight.css",
    "revision": "58a991a7f11108db7f9cca74d0836a2a"
  }, {
    "url": "css/main.css",
    "revision": "79a876333ecb70eb1313ddd0f9bec86d"
  }, {
    "url": "friends-api.js",
    "revision": "66cb3589bdeef611c1fa55a7ae47d2f1"
  }, {
    "url": "friends.js",
    "revision": "79a1fe4ab7e28d873ce416eb9251fa49"
  }, {
    "url": "history/S1-mini_project/index.html",
    "revision": "171d0c1e76b85b5f60eb719d2077d959"
  }, {
    "url": "history/S1-mini_project/Julius-Caesar_2.jpg",
    "revision": "99e14cdee2076d297d97cdc43c966861"
  }, {
    "url": "img/24/5/螢幕擷取畫面 2024-03-17 080553_51e41f286bcc7489300719741690e02e.png",
    "revision": "badf1a43dd35fb32591de1ffaa8d76ad"
  }, {
    "url": "img/av.png",
    "revision": "29114c41bd7544628856dee304c625b2"
  }, {
    "url": "img/avatar.png",
    "revision": "4dc9b26fb952fddbcf32744bdb6c34bb"
  }, {
    "url": "img/default.png",
    "revision": "beb05a6b5b201044b6d80cacdf29f905"
  }, {
    "url": "img/fluid.png",
    "revision": "16d1c0eb4731679b2daea92a4aa901de"
  }, {
    "url": "img/loading.gif",
    "revision": "15657539044e11a19a1c6c7e3073d1b3"
  }, {
    "url": "img/police_beian.png",
    "revision": "b769e8dfde5660239317ed60758dba13"
  }, {
    "url": "img/slide/eng/short-story/my-own/a41f1b237614b2a739813fb4abbf90f.png",
    "revision": "fc116e83f469774b879cc581aceb1ac5"
  }, {
    "url": "img/slide/eng/short-story/my-own/p2.png",
    "revision": "41ae12b43d2375591770f6651098bca9"
  }, {
    "url": "img/slide/eng/short-story/v1/p1.jpg",
    "revision": "1ea105923f7e7772817b0768804671dc"
  }, {
    "url": "img/slide/eng/short-story/v1/p2.jpg",
    "revision": "67eec5a4988561b449445f9bb290f7fc"
  }, {
    "url": "img/slide/eng/short-story/v1/p3.jpg",
    "revision": "bae07fec02bde5d77c7f1f7c35502df3"
  }, {
    "url": "img/slide/eng/short-story/v1/p4.jpg",
    "revision": "dee2b5fe1276dc0404d13d65357b17eb"
  }, {
    "url": "img/slide/eng/short-story/v1/p5.jpg",
    "revision": "234e03f7dde6a9745f54e6e026ea1d02"
  }, {
    "url": "img/suck-nigga-dick/尸口中月.png",
    "revision": "ad1342e2919458c090f4e2b3caa88b17"
  }, {
    "url": "img/w-code/404.png",
    "revision": "00482242aba8fc74b7a291bb6b951570"
  }, {
    "url": "index.html",
    "revision": "f3f845ed66599c96906ffa2fe3cb85ea"
  }, {
    "url": "js/boot.js",
    "revision": "6828d1c2b0f760a21d77619ad4935b8c"
  }, {
    "url": "js/color-schema.js",
    "revision": "e6876b9ca1d19c25a1869fd3c1331d15"
  }, {
    "url": "js/events.js",
    "revision": "2acc59bbaa8e712a09c5e35a8cf431f3"
  }, {
    "url": "js/img-lazyload.js",
    "revision": "4e77ee4da380dd3a70ae83f8dddf9682"
  }, {
    "url": "js/leancloud.js",
    "revision": "934a4dd6b23e0cf75e77d3f5937b3d06"
  }, {
    "url": "js/local-search.js",
    "revision": "010b5de70eb7f79a6cc2326ea0fbb442"
  }, {
    "url": "js/main.js",
    "revision": "13c1fad37cec9fbcce095011a47a7a59"
  }, {
    "url": "js/plugins.js",
    "revision": "ac70ebcb78219124aeb9df9e35ea89bd"
  }, {
    "url": "js/utils.js",
    "revision": "a283ae2c56398aade2139ebedf6546fb"
  }, {
    "url": "lib/hbe.js",
    "revision": "b5815d2fce2c94f26cb35d448cafe68f"
  }, {
    "url": "links/index.html",
    "revision": "cf4f85d0e8681331dcaa820fb4a1de58"
  }, {
    "url": "style.css",
    "revision": "931f21c1dc365b2cd69b80d815eb878f"
  }, {
    "url": "tags/honeygain/index.html",
    "revision": "4eccfa69b4d07f39bb55d831200c2e6c"
  }, {
    "url": "tags/index.html",
    "revision": "849d5f796fd75b929a795adaf6eb98ea"
  }], {});
  workbox.registerRoute(/\.(?:html|js|css|png|jpg|jpeg|svg|gif)$/, new workbox.CacheFirst({
    "cacheName": "hexo-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 2592000
    })]
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
