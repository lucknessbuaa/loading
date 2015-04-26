var $ = require('zepto-browserify').$;
var Backbone = require('backbone');
Backbone.$ = $;

var Snow = require('./snow');

var Loading = Backbone.View.extend({
    tagName: 'div',

    className: 'page loading',

    initialize: function(options) {
        this.step = options.step;
        this.duration = options.duration;
        this.stepLength = Math.ceil(100 / this.step);
        this.callback = options.callback;

        this.snow = new Snow();
        this.$el.append(this.snow.$el[0]);

        this.cssView();
        this.initPage();
        this.percentAnimate();
    },

    percentAnimate: function() {
        var stepduration = this.duration / this.step;
        for (var i = this.stepLength; i <= 100; i += this.stepLength) {
            setTimeout(function(i) {
                this.$el.find('.percent')[0].innerHTML = i + '%';

                var height = 108 - 1.08 * i + 'px';
                this.$el.find('.loadingWater').css({
                    'clip': 'rect(' + height + ' 33px 108px 0px)'
                });
            }.bind(this, i), stepduration * i / this.stepLength);
        }

        setTimeout(function() {
            this.$el.find('.percent')[0].innerHTML = '100%';
            this.$el.find('.loadingWater').css({
                'clip': 'rect(0px 33px 108px 0px)'
            });
            this.destroy();
        }.bind(this), this.duration);
    },

    cssView: function() {
        this.$el.css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'width': '100%',
            'height': '100%',
            'background': 'url("/static/images/loading/loadingBg.png") 0px 0px no-repeat',
            'background-size': '100% 100%'
        });
    },

    initPage: function() {
        this.initPercent();
        this.initText();
        this.initLogo();
        this.initBottle();
    },

    initPercent: function() {
        var $percentDiv = $('<div><span class="loadText">Loading</span><span class="percent">0%</span></div>');
        this.$el.append($percentDiv[0]);

        $percentDiv.css({
            'position': 'absolute',
            'bottom': '65%',
            'width': '100%',
            'height': '50px',
            'text-align': 'center',
            'color': '#ffffff'
        });
        $percentDiv.find('.loadText').css({
            'position': 'absolute',
            'top': '0px',
            'width': '100px',
            'margin-left': '-50px',
            'font-size': '16px',
            'line-height': '16px',
            'left': '50%'
        });
        this.$el.find('.percent').css({
            'position': 'absolute',
            'width': '100px',
            'top': '25px',
            'margin-left': '-50px',
            'font-size': '25px',
            'line-height': '25px',
            'left': '50%'
        });
    },

    initText: function() {
        var image = new Image();
        image.src = '/static/images/loading/loadingText.png';
        image.onload = function() {
            this.$el.append(image);
            $(image).css({
                'position': 'absolute',
                'bottom': '25%',
                'text-align': 'center',
                'width': '94px',
                'height': '34px',
                'left': '50%',
                'margin-left': '-47px'
            });
        }.bind(this);
    },

    initLogo: function() {
        var image = new Image();
        image.src = '/static/images/loading/loadingLogo.png';
        image.onload = function() {
            this.$el.append(image);
            $(image).css({
                'position': 'absolute',
                'bottom': '10%',
                'width': '58px',
                'height': '34px',
                'left': '50%',
                'margin-left': '-29px'
            });
        }.bind(this);

        $(image).error(function() {
            //todo 
            console.log('image not found');
        });
    },

    initBottle: function() {
        var $bottle = $('<div></div>');
        this.$el.append($bottle);

        var image1 = new Image();
        image1.src = '/static/images/loading/loadingBottle.png';
        var image2 = new Image();
        image2.src = '/static/images/loading/loadingWater.png';
        var image3 = new Image();
        image3.src = '/static/images/loading/loadingBottleImg.png';

        image1.onload = function() {
            $(this).css({
                'position': 'absolute',
                'bottom': '38%',
                'width': '33px',
                'height': '124px',
                'left': '50%',
                'margin-left': '-17px'
            });
            $bottle.append(image1);
        };

        image2.onload = function() {
            $(this).css({
                'position': 'absolute',
                'bottom': '38%',
                'width': '33px',
                'height': '108px',
                'left': '50%',
                'margin-left': '-17.5px',
                'z-index': '40',
                'margin-bottom': '2px',
                'clip': 'rect(108px, 33px, 108px, 0px)'
            });
            $(this).addClass('loadingWater');
            $bottle.append(image2);
        };

        image3.onload = function() {
            $(this).css({
                'position': 'absolute',
                'bottom': '38%',
                'width': '33px',
                'height': '34px',
                'left': '50%',
                'margin-left': '-17.5px',
                'margin-bottom': '12px',
                'z-index': '50'
            });
            $bottle.append(image3);
        };
    },

    destroy: function() {
        this.callback();
        this.snow.destroy();
        this.$el.detach();
    }
});

module.exports = Loading;
