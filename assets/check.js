function refreshStatus(uri, param) {
  var st = document.getElementsByClassName('httpstatus')
  var stats = document.getElementById('success-stats')
  var down = document.getElementById('danger-stats')
  var check = document.getElementById('warning-stats')
  st[param].classList.remove('success-bg')
  st[param].classList.remove('warning-bg')
  st[param].classList.remove('danger-bg')
  
  $.ajax({
    type: "GET",
    url: window.location.href + 'check.php?target=' + uri,
    dataType: "html",
    success: function(e){
      var hc = document.getElementsByClassName('httpcode')
      if(e >= 200 && e < 304){
        st[param].innerHTML = '<span>UP</span>'
        st[param].classList.toggle('success-bg')
        if(stats.innerText < st.length){
          stats.innerHTML++;
        }
      }else if(e >= 304 && e < 400){
        st[param].innerHTML = '<span>CHECK</span>'
        st[param].classList.toggle('warning-bg')
        if(stats.innerText > 0){
          stats.innerHTML--;
        }
        check.innerHTML++;
      }else{
        st[param].innerHTML = '<span>DOWN</span>'
        st[param].classList.toggle('danger-bg')
        if(stats.innerText > 0){
          stats.innerHTML--;
        }
        down.innerHTML++;
      }
      hc[param].innerHTML = e
    },
    error: function(){

    }
  })
}

var webData = [
  'http://www.dpr.go.id/',
  'http://dpr.go.id/serba-serbi/tv-parlemen'
]

var i = 0;
setInterval(function() {
  refreshStatus(webData[i], i)
  if (i >= webData.length - 1) {
    i = 0;
  }else{
    i++;
  }
}, 3000);

var dt = new Date();
document.getElementById("last-refresh").innerHTML = dt.toLocaleString();