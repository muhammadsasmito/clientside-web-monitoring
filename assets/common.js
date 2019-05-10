var cInt = setInterval("countdown()", 1000);
      var scrollable = true;

      function countdown() {
        var current = $('.counter').html();
        if (current > 0) {
          $('.counter').html(current - 1);
        } else {
          $('.counter').html(59);
          callMonitorList();
        }
      }

      $(document).ready(function () { callMonitorList() });

var pageUrl = window.location.href.replace(location.search, "").replace(/\/$/, "");
var urlParams = new URLSearchParams(window.location.search);
var apiPageValue = 1;
var firstIndex = 0;
var lastIndex = 5;
if (urlParams.has("page") && !isNaN(urlParams.get("page") * 1)) {
    apiPageValue = urlParams.get("page") * 1;
    if (urlParams.get("page") * 1 < 1) {
        apiPageValue = 1
    }
}
if (scrollable === true) {
    $(window).scroll(function() {
        if ($("#overview").isInViewport()) {
            $(".floating-status-overview").fadeOut(500)
        } else {
            $(".floating-status-overview").fadeIn(500)
        }
    })
}

function clearCountdown() {
    clearInterval(cInt)
}

function loadMore() {
    var logTableHtml;
    if (lastIndex > logs.length) {
        $("#load-more-logs-button").remove()
    }
    slicedLogs = logs.slice(firstIndex, lastIndex);
    $.each(slicedLogs, function(i, log) {
        logTableHtml += "<tr>";
        logTableHtml += '<td class="status"><span class="table-status-item ' + log.class + '-bg">' + log.label + "</span></td>";
        logTableHtml += "<td>" + log.date + "</td>";
        logTableHtml += '<td class="reason"><span class="' + log.class + '">' + log.reason + "</span></td>";
        logTableHtml += '<td class="duration">' + log.duration + "</td>"
    });
    $("#events-table tbody").append(logTableHtml);
    step = lastIndex - firstIndex;
    firstIndex = lastIndex;
    lastIndex = lastIndex + step
}

function callMonitorList() {
    $.ajax({
        type: "GET",
        url: pspApiPath + "?page=" + apiPageValue,
        dataType: "json",
        cache: false,
        success: function(data) {
            var monitorTableHtml = '<tr><td colspan="4"></td>';
            $.each(data.days, function(i, day) {
                monitorTableHtml += '<td class="date">' + day + "</td>"
            });
            monitorTableHtml += "</tr>";
            $.each(data.psp.monitors, function(i, mon) {
                monitorTableHtml += "<tr>";
                monitorTableHtml += '<td><span class="bullet ' + mon.statusClass + '-bg"></span></td>';
                monitorTableHtml += '<td class="ratio ' + mon.weeklyRatio.label + ' padded">' + mon.weeklyRatio.ratio + "%</td>";
                monitorTableHtml += '<td class="name padded flex-parent"><a title="' + mon.name + '" class="long-and-truncated" href="' + pageUrl + "/" + mon.monitorId + '">' + mon.name + "</a></td>";
                monitorTableHtml += '<td class="type padded">' + mon.type + "</td>";
                $.each(mon.dailyRatios, function(i, daily) {
                    monitorTableHtml += '<td><span class="table-status-item ' + daily.label + '-bg">' + daily.ratio + "%</span></td>"
                });
                monitorTableHtml += "</tr>"
            });
            $("tbody").html(monitorTableHtml);
            if (data.psp.totalMonitors > data.psp.perPage) {
                var lastPage = Math.ceil(data.psp.totalMonitors / data.psp.perPage);
                var pageLimit = 10;
                var startPoint = 1;
                var currentPage = 1;
                var breakLimit = 5;
                paginationHtml = '<ul class="pagination pagination-sm ng-scope"><li><a href="?page=1">««</a></li>';
                if (urlParams.has("page") && !isNaN(urlParams.get("page") * 1)) {
                    if (urlParams.get("page") * 1 < 1) {
                        currentPage = 1
                    } else if (urlParams.get("page") * 1 > lastPage) {
                        currentPage = lastPage
                    } else {
                        currentPage = urlParams.get("page") * 1
                    }
                }
                var previousPage = currentPage == 1 ? 1 : currentPage - 1;
                var nextPage = currentPage + 1;
                paginationHtml += '<li><a href="?page=' + previousPage + '">«</a></li>';
                if (lastPage < pageLimit) {
                    pageLimit = lastPage
                } else {
                    if (currentPage > breakLimit) {
                        startPoint = currentPage - breakLimit;
                        pageLimit = startPoint + (pageLimit - 1);
                        if (pageLimit > lastPage) {
                            pageLimit = lastPage
                        }
                    }
                }
                for (var i = startPoint; i <= pageLimit; i++) {
                    var active = currentPage == i ? " active" : "";
                    paginationHtml += '<li><a href="?page=' + i + '" class="ng-binding' + active + '">' + i + "</a></li>"
                }
                paginationHtml += '<li><a href="?page=' + nextPage + '">»</a></li>';
                paginationHtml += '<li><a href="?page=' + lastPage + '">»»</a></ul>';
                $(".monitor-table").next().html(paginationHtml)
            }
            var n = 1;
            $.each(data.statistics.uptime, function(k, v) {
                $("#overall-uptime ul li:nth-child(" + n + ") strong").addClass(v.label).html(v.ratio + "%");
                $("#overall-uptime ul li:nth-child(" + n + ") p").html(v.downtime);
                n++
            });
            var selectedSpan = $("#quick-stats .current-status span").first();
            var selectedP = $("#quick-stats .status-information p").first();
            var selectedFloatingSpan = $("#floating-stats .current-status span").first();
            var selectedFloatingP = $("#floating-stats .status-information p").first();
            if (data.statistics.counts.down == 0) {
                selectedSpan.addClass("success-bg");
                selectedP.addClass("success").html(data.statistics.count_result);
                selectedFloatingSpan.addClass("success-bg");
                selectedFloatingP.addClass("success").html(data.statistics.count_result)
            } else {
                selectedSpan.addClass("danger-bg");
                selectedP.addClass("danger").html(data.statistics.count_result);
                selectedFloatingSpan.addClass("danger-bg");
                selectedFloatingP.addClass("danger").html(data.statistics.count_result)
            }
            n = 1;
            $.each(data.statistics.counts, function(k, v) {
                $("#quick-stats ul li:nth-child(" + n + ") .right").html(v);
                $(".floating-status-overview ul li:nth-child(" + n + ") span").last().html(v);
                n++
            });
            $("#latest-downtime").find("p").html(data.statistics.latest_downtime);
            $(".controller").show();
            $("#loader-overlay").fadeOut()
        },
        error: function(error) {
            console.log(error);
            clearCountdown()
        }
    })
}

function callMonitorDetail(callLog) {
    $.ajax({
        type: "GET",
        url: pspApiPath,
        dataType: "json",
        cache: false,
        success: function(data) {
            logs = data.monitor.logs;
            $("title").text(data.monitor.name + " - " + data.title);
            $("#monitor-header").find("h2").addClass(data.monitor.statusClass).html(data.monitor.name + " <span>(" + data.monitor.type + " - " + data.monitor.checkInterval + ")</span>");
            $(".events-heading").html(data.monitor.eventsTitle);
            var uptimeTableHtml = "<tr>";
            $.each(data.days, function(i, day) {
                uptimeTableHtml += '<td align="center">' + day + "</td>"
            });
            uptimeTableHtml += "</tr><tr>";
            $.each(data.monitor.dailyRatios, function(i, daily) {
                uptimeTableHtml += '<td><span class="table-status-item ' + daily.label + '-bg">' + daily.ratio + "%</span></td>"
            });
            uptimeTableHtml += "</tr>";
            $("#weekly-uptime-container tbody").html(uptimeTableHtml);
            if (callLog) {
                loadMore()
            }
            var ctxLabels = [];
            var ctxData = [];
            if (data.monitor.responseTimes.length > 0) {
                $.each(data.monitor.responseTimes, function(i, rt) {
                    ctxLabels.push(rt.datetime);
                    ctxData.push(rt.value)
                })
            }
            $("#monitor-chart").remove();
            $("#chart-container").append('<canvas id="monitor-chart" height="194"></canvas>');
            var ctx = document.getElementById("monitor-chart");
            var selectedFloatingSpan = $("#floating-stats .current-status span").first();
            var selectedFloatingP = $("#floating-stats .status-information p").first();
            if (data.statistics.counts.down == 0) {
                selectedFloatingSpan.addClass("success-bg");
                selectedFloatingP.addClass("success").html(data.statistics.count_result)
            } else {
                selectedFloatingSpan.addClass("danger-bg");
                selectedFloatingP.addClass("danger").html(data.statistics.count_result)
            }
            n = 1;
            $.each(data.statistics.counts, function(k, v) {
                $(".floating-status-overview ul li:nth-child(" + n + ") span").last().html(v);
                n++
            });
            $(".controller").show();
            var chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ctxLabels,
                    datasets: [{
                        label: chartLabel,
                        data: ctxData,
                        backgroundColor: "rgb(237, 194, 64, 0.2)",
                        borderColor: "rgb(237, 194, 64)",
                        borderWidth: 3,
                        lineTension: 0,
                        pointRadius: 0,
                        pointHitRadius: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "rgb(214, 216, 219)",
                                fontStyle: "bold"
                            },
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        position: "top right",
                        display: true,
                        labels: {
                            fontColor: "rgb(237, 194, 64)"
                        }
                    }
                }
            });
            $("#loader-overlay").fadeOut()
        },
        error: function(error) {
            console.log(error);
            clearCountdown()
        }
    })
}
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom
};
$(function() {
    $("#load-more-logs-button").on("click", function() {
        loadMore()
    });
    $("#login-form").submit(function(e) {
        $(".form-message").text();
        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serialize(),
            dataType: "json",
            cache: false,
            success: function(data) {
                if (data.success === true) {
                    $(".form-message").removeClass("form-error").addClass("form-success").text(data.message);
                    window.location.replace(window.location.protocol + "//" + window.location.host + "/" + data.redirect)
                } else {
                    $(".form-message").removeClass("form-success").addClass("form-error").text(data.message)
                }
            }
        });
        e.preventDefault()
    })
});