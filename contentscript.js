//좋아요 class 얻어오기
var like = 0;

var likebutton = document.getElementsByClassName('UFILikeLink');
console.log(likebutton);

for(var i=0; i<likebutton.length; i++) {
	likebutton[i].onclick = function() {
			console.log('click');
			like++;
			console.log(like);
	}
}