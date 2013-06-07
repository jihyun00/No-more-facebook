//좋아요 얻어오기
document.onclick = function(event) {
	if(event.target.title == 'Unlike this') {
		console.log('hi');

		var port = chrome.runtime.connect({name: "nofacebook"});
			port.postMessage({'action': 'like'});
	}
}

/*
document.onkeydown = function(event){
    event = event || window.event;
    var keycode = event.charCode || event.keyCode;
    if(keycode === 13){
    	if(event.target.title == '댓글 달기...') {
    		//console.log(this.value)
    		if(event.target.value == '') {
    			console.log('fail');
    		}

    		else if(event.target.value == '댓글 달기...') {
    			console.log('fail again')
    		}

    		else {
    			console.log('succeed');
    		}
    	}
	}
}

document.onkeydown = function(event) {
	if(event.target.title == 'Unlike this') {
		console.log('hi');

		var port = chrome.runtime.connect({name: "nofacebook"});
			port.postMessage({'action': 'like'});
	}
}
*/
//댓글 얻어오기
var comment = document.getElementsByName('add_comment_text');

for(var k=0; k<comment.length; k++) {
	var currComment = comment[k];
	currComment.onkeydown = function(event){
	    event = event || window.event;
	    var keycode = event.charCode || event.keyCode;
		    if(keycode === 13){
		    	if(this.value == '댓글 달기...')
		    		console.log('기록 ㄴㄴ');

		    	else if(this.value == '')
		    		console.log("don't write");

		    	else {
		    		var port = chrome.runtime.connect({name: "nofacebook"});
					port.postMessage({'action': 'Comment'});
		    	}
	    }

	}
}

var comment_two = document.getElementsByName('add_comment_text_text');

for(var j=0; j<comment_two.length; j++) {
	var currComment_two = comment_two[j];
	currComment_two.onkeydown = function(event){
	    event = event || window.event;
	    var keycode = event.charCode || event.keyCode;
	    if(keycode === 13){
	        if(this.value == '댓글 달기...')
		    	console.log('기록 ㄴㄴ');

	    	else if(this.value == '')
	    		console.log("don't write");

	    	else {
	    		var port = chrome.runtime.connect({name: "nofacebook"});
				port.postMessage({'action': 'Comment'});
	    	}
	    }
	}
}


