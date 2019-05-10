<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <link rel="shortcut icon" type="image/png" href="https://uptimerobot.com/assets/ico/favicon.ico">
  <title>DPR Web Monitor</title>
  <link rel="canonical" href="https://status.uptimerobot.com/">

  <!-- Styles -->
  <link href="assets/custom.css" rel="stylesheet">
  <link href="assets/static.css" rel="stylesheet">

  <!-- Code snippet to speed up Google Fonts rendering: googlefonts.3perf.com -->
  <link rel="dns-prefetch" href="https://fonts.gstatic.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous">
  <link rel="preload" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700" as="fetch"
    crossorigin="anonymous">
  <script type="text/javascript">
    !function (e, n, t) { "use strict"; var o = "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700", r = "__3perf_googleFontsStylesheet"; function c(e) { (n.head || n.body).appendChild(e) } function a() { var e = n.createElement("link"); e.href = o, e.rel = "stylesheet", c(e) } function f(e) { if (!n.getElementById(r)) { var t = n.createElement("style"); t.id = r, c(t) } n.getElementById(r).innerHTML = e } e.FontFace && e.FontFace.prototype.hasOwnProperty("display") ? (t[r] && f(t[r]), fetch(o).then(function (e) { return e.text() }).then(function (e) { return e.replace(/@font-face {/g, "@font-face{font-display:swap;") }).then(function (e) { return t[r] = e }).then(f).catch(a)) : a() }(window, document, localStorage);
  </script>

</head>

<body>
  <div class="controller ng-scope" style="display: block;">
    <div id="page-container">
      <div id="overview">
        <div class="wrapper cf">
          <section class="one-third">
            <div class="logo-wrapper" style="margin: auto;text-align: center;">
            <img alt="DPR Web Monitor Status" class="logo" src="assets/724971-1556156288.png">
            <h2>Monitoring Server DPR RI</h2>
            </div>
          </section>

          <section id="latest-downtime" class="one-third">
            <h2>Latest Downtime</h2>
            <p>It was recorded for the monitor DPR Website on <span id="last-refresh"></span>.</p>
          </section>

          <section id="quick-stats" class="one-third">
            <h2>Quick Stats</h2>
            <ul class="stats">
              <li class="cf">
                <span class="bullet bullet-sm success-bg"></span>
                <span class="success">Up</span>
                <span class="success right" id="success-stats">0</span>
              </li>
              <li class="cf">
                <span class="bullet bullet-sm danger-bg"></span>
                <span class="danger fl">Down</span>
                <span class="danger fr right" id="danger-stats">0</span>
              </li>
              <li class="cf">
                <span class="bullet bullet-sm paused-bg"></span>
                <span class="paused fl">Warning</span>
                <span class="paused fr right" id="warning-stats">0</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <section id="monitors">
        <div class="wrapper">
          <div class="seperator"></div>
          <div class="monitor-table">
            <table>
              <thead>
                <tr>
                  <th class="padded">Status</th>
                  <th class="padded">Url</th>
                  <th class="padded">Deskripsi</th>
                  <th class="padded">Port</th>
                  <th class="padded">Curl</th>
                </tr>
              </thead>
              <tbody class="monitor-data">
                <tr>
                  <td class="httpstatus"></td>
                  <td class="type padded">www.dpr.go.id</td>
                  <td class="name padded flex-parent"><a title="Website DPR RI" class="long-and-truncated"
                      href="www.dpr.go.id">Website DPR RI</a></td>
                  <td class="type padded">www.0.10</td>
                  <td class="type padded httpcode"></td>
                </tr>
                <tr>
                  <td class="httpstatus"></td>
                  <td class="type padded">dpr.go.id/serba-serbi/tv-parlemen</td>
                  <td class="name padded flex-parent"><a title="Website TV Parlemen" class="long-and-truncated"
                      href="dpr.go.id/serba-serbi/tv-parlemen">Website TV Parlemen</a></td>
                  <td class="type padded">www.0.10</td>
                  <td class="type padded httpcode"></td>
                </tr>                
              </tbody>
            </table>
          </div>

          <div class="text-center"></div>

        </div>
      </section>

    </div>

    <footer id="main-footer">
      <div class="wrapper">
      </div>
    </footer>
    <script src="assets/jquery-3.js"></script>
    <script src="assets/check.js"></script>
  <div id="loader-overlay" class="fade-box" style="display: none;">
    <div class="loader-container">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>

</body>

</html>