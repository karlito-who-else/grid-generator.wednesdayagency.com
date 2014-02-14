$(document).ready(function() {
  $('section div.container, section div.container-fluid').wrap('<div class="contents"></div>');
  $('.contents .container').parent().after($('.demonstration .container').parent()[0].outerHTML);
  $('.contents .container-fluid').parent().after($('.demonstration .container-fluid').parent()[0].outerHTML);
});