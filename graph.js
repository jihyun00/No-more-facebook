$(document).ready(function(){
  $('.one').click(function(){
    $('.bulletin').show();
    $('.like').hide();
    $('.comment').hide();
    $('.staytime').hide();
  });

  
  $('.two').click(function(){
    $('.bulletin').hide();
    $('.like').show();
    $('.comment').hide();
    $('.staytime').hide();
  });

  $('.three').click(function(){
    $('.bulletin').hide();
    $('.like').hide();
    $('.comment').show();
    $('.staytime').hide();
  });

  $('.four').click(function(){
    $('.bulletin').hide();
    $('.like').hide();
    $('.comment').hide();
    $('.staytime').show();
  });
});