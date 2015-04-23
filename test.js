var $ = require('jquery');
var Loading = require('./index');
window.$ = $;
window.jquery = $;

$(function() {
    var page = new Loading({
        'step': 10,
        'duration': 5000
    });
    $('body').append(page.$el);
});
