//좋아요 얻어오기
var like = 0;

var likebutton = document.getElementsByClassName('UFILikeLink');
console.log(likebutton);


for(var i=0; i<likebutton.length; i++) {
	var currLikeButton = likebutton[i];
	currLikeButton.onclick = function() {
		console.log("hi>", this);
		if(this.innerText == '좋아요 취소') {
			console.log('nono');
		}
		else {
			console.log('click');
			like++;
			console.log(like);
			// {'action': 'like'}
			var port = chrome.runtime.connect({name: "nofacebook"});
			port.postMessage({like: like});
		}
	}
}

//댓글 얻어오기
var commentcount = 0;

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
		    		commentcount++;
		    		console.log(commentcount);
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
	    		commentcount++;
	    		console.log(commentcount);
	    	}
	    }
	}
}

//port.postMessage({comment: commentcount});

