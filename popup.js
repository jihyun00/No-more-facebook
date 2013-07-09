//간단한 css 조절
$(document).ready(function(){
  $('.timesetting').click(function(){
    $('.time').slideDown('slow');
  });

  $("#initSetUp").click(function(e) {
    console.log("here");
    window['facebook'] = new OAuth2('facebook', {
      client_id: '387137241401615',
      client_secret: '1b4a7e6580e49ff2fd21eb1f35aaf331',
      api_scope: 'read_stream,user_about_me,user_actions.news,user_activities,user_photos,user_status',
      redirect_uri: 'http://localhost'
    //뉴스피드 접근, 좋아요 누르기, 페이스북 대화, 댓글 달기, 글작성
    });

    window.facebook.authorize(function() {

    })
  });
});

$(function(){
  $('#alltime').click(function(){
    $('.time').slideUp('slow');
  });
});

//설정해 준 내역 저장
function save_options() {
  var setting = $(':input[name=time]:checked').val();
  var starthour = $('select[name=starthour]').val();
  var startmin = $('select[name=startmin]').val();
  var endhour = $('select[name=endhour]').val();
  var endmin = $('select[name=endmin]').val();

  localStorage.setItem('setting', setting);
  localStorage.setItem('starthour', starthour);
  localStorage.setItem('startmin', startmin);
  localStorage.setItem('endhour', endhour);
  localStorage.setItem('endmin', endmin);

  console.log('setting saved');
}

//설정 저장
$(function() {
  $('#setting').click(function() {
    save_options();
  });
});

//설정 초기화
$(function() {
  $('#reset').click(function() {
    window.localStorage.clear();
    console.log('reset success');
  });
});

//facebook 이미 연결했다면
var oauth2_facebook = localStorage.getItem('oauth2_facebook');

if(oauth2_facebook.search('accessToken') != -1) {
  $(document).ready(function(){
    $(".init").css("display","none");
    $(".second").css("display","block");
  });
}

//accessToken 얻어오기
var oauth = oauth2_facebook;
var oauth = JSON.parse(oauth);
console.log(oauth.accessToken);

function identifier(data) {
  var id;
  $.ajax({
    type : 'get',
    async: false,
    datatype: 'json',
    url: 'https://graph.facebook.com/me?fields=posts.fields(actions)&access_token=' + oauth.accessToken,
    success: function(data) {
      id = data.id;
    }
  });
  return id;
}

//게시글 횟수
var bulletin = function(callback) {
  $.ajax({
    type : 'get',
    datatype : 'json',
    url : 'https://graph.facebook.com/me?fields=posts.fields(actions)&access_token=' + oauth.accessToken,    
    success : function(data) {
      console.log(data.id);
      console.log(data.posts.data);
      var count = 0;

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var date = date.getDate();
      //var hour = date.getHours();
      //hour = hour - 9;

      if(month.string().length == 1) {
        month = '0'+ month;
      }

      if(date.string().length == 1) {
        date = '0'+ date;
      }

      var time = year + '-' + month + '-' + date;

      console.log(time);
      
      for(i=0; i<25; i++) {
        if(data.posts.data[i].created_time.search(time) != -1) {
          count++;
        }
        console.log(count);
      }
    }
  });
}

data = {'kind' : 'bulletin', 'identifier': identifier()};
$.ajax({
  type: 'post',
  data: bulletin,
  url: 'http://jihyun.nslinkle.com:9000/update',
  success: function(data) {
    console.log('Bulletin Upload Success')
  },
  error: function(data) {
    console.log('code:' +request.status + 'message:' +request.responseText)
  }
});

//시간 오류 나는 부분 있음(우리나라 시간이랑 페이스북 시간이랑 안맞으므로 보정필요 ㅜㅜ timezone 9)
