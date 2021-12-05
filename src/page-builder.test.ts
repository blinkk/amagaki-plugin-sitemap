import {Pod, Route} from '@amagaki/amagaki';

import {ExecutionContext} from 'ava';
import test from 'ava';

test('PageBuilder', async (t: ExecutionContext) => {
  const pod = new Pod('./example');
  await pod.router.warmup();
  const html = await (await pod.router.resolve('/pages/') as Route).build();
  const expected = `
<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/WebPage">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="no-referrer">
  <meta property="og:type" content="website">
  <meta property="og:url" content="http://localhost/pages/">
  <meta property="og:locale" content="en">
  <meta property="twitter:card" content="summary_large_image">
  <link href="http://localhost/pages/" rel="canonical">
  <link href="http://localhost/pages/" hreflang="x-default" rel="alternate">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons|Roboto:400,500,700&amp;display=swap" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link href="./../static/css/main.css?fingerprint=d41d8cd98f00b204e9800998ecf8427e" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <script src="./../static/js/main.js?fingerprint=d41d8cd98f00b204e9800998ecf8427e"></script>
</head>

<body>
  <div class="main">
    <header>
      <page-module>
        <div class="header">
          <p>Header</p>
        </div>
      </page-module>
    </header>
    <main>
      <link href="./../static/css/partials/hero.css?fingerprint=d41d8cd98f00b204e9800998ecf8427e" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <script src="./../static/js/partials/hero.js?fingerprint=d41d8cd98f00b204e9800998ecf8427e"></script>
      <page-module>
        <div class="hero">
          <h1>Hello World 1!</h1>
          <img src="data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7" alt="Alt text">
        </div>
      </page-module>
      <page-module>
        <div class="hero">
          <h1>Hello World 2!</h1>
        </div>
      </page-module>
    </main>
  </div>
</body>

</html>
  `.trim();
  t.deepEqual(html, expected);
});

test('PageBuilder dev', async (t: ExecutionContext) => {
  const pod = new Pod('./example', {dev: true, name: 'test'});
  await pod.router.warmup();
  const html = await (await pod.router.resolve('/pages/') as Route).build();
  const expected = `
<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/WebPage">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="no-referrer">
  <meta property="og:type" content="website">
  <meta property="og:url" content="http://localhost/pages/">
  <meta property="og:locale" content="en">
  <meta property="twitter:card" content="summary_large_image">
  <link href="http://localhost/pages/" rel="canonical">
  <link href="http://localhost/pages/" hreflang="x-default" rel="alternate">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons|Roboto:400,500,700&amp;display=swap" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link href="./../static/css/main.css?fingerprint=d41d8cd98f00b204e9800998ecf8427e" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <script src="./../static/js/main.js?fingerprint=d41d8cd98f00b204e9800998ecf8427e"></script>
  <script src="./../_page-builder/page-builder-ui.min.js"></script>
</head>

<body>
  <div class="main">
    <header>
      <page-module>
        <page-module-inspector partial="header"></page-module-inspector>
        <div class="header">
          <p>Header</p>
        </div>
      </page-module>
    </header>
    <main>
      <link href="./../static/css/partials/hero.css?fingerprint=d41d8cd98f00b204e9800998ecf8427e" rel="stylesheet" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <script src="./../static/js/partials/hero.js?fingerprint=d41d8cd98f00b204e9800998ecf8427e"></script>
      <page-module>
        <page-module-inspector partial="hero"></page-module-inspector>
        <div class="hero">
          <h1>Hello World 1!</h1>
          <img src="data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7" alt="Alt text">
        </div>
      </page-module>
      <page-module>
        <page-module-inspector partial="hero"></page-module-inspector>
        <div class="hero">
          <h1>Hello World 2!</h1>
        </div>
      </page-module>
    </main>
  </div>
  <page-inspector></page-inspector>
</body>

</html>
  `.trim();
  t.deepEqual(html, expected);
});
