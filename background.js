//저장소에서 불러오기
var setting = localStorage.getItem('setting', setting);
var starthour = localStorage.getItem('starthour', starthour);
var startmin = localStorage.getItem('startmin', startmin);
var endhour = localStorage.getItem('endhour', endhour);
var endmin = localStorage.getItem('endmin', endmin);

//현재 시간 얻어 오기
var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();

var nowtime = (hour * 60) + min;

//int형으로 변환
var starthour = parseInt(starthour);
var startmin = parseInt(startmin);
var endhour = parseInt(endhour);
var endmin = parseInt(endmin);

//시간 계산
var starttime = (starthour * 60) + startmin;
var fintime = (endhour * 60) + endmin;

//시간대별 block
if(setting == 'collecttime') {
	/*if(nowtime > starttime) {
		var starthour = (starthour + 24) - (hour - starthour);
		var settime = (starthour * 60) + startmin;
		var init_interval = settime - nowtime;
		var init_interval = init_interval * 60000;
		var endhour = (endhour + 24) - (hour - endhour);
		var fintime = (endhour * 60) + endmin;
		var interval = fintime - nowtime;
		var interval = interval * 60000;

		block(init_interval, interval);
	}*/
	if(nowtime > starttime) {
		var init_interval = 0;
		var interval = fintime - nowtime;
		var interval = interval * 60000;

		block(init_interval, interval);
	}

	else {
		var settime = starttime;
		var init_interval = settime - nowtime;
		var init_interval = init_interval * 60000;
		var interval = fintime - nowtime;
		var interval = interval * 60000;

		if(interval < 0) {
			initcss();
		}

		block(init_interval, interval);
	}
}

else {
	changecss();
}

function block(init_interval, interval) {
	setTimeout(function(){changecss()},init_interval); //init_interval 시간 후에 block 설정
	setTimeout(function(){initcss()},interval); //interval 시간 후에 block 해제
}

function changecss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(tabId, {file: "change.css"});
			//chrome.tabs.executeScript(tabId, {file:"script.js"});
		}
	});
}

function initcss() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(tab.url.search('facebook.com') != -1) {
			chrome.tabs.insertCSS(tabId, {file: "init.css"});
			//chrome.tabs.executeScript(tabId, {file:"delete.js"});
		}
	});
}