var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
window.$ = $;

var Snow = Backbone.View.extend({
    tagName: 'div',

    className: 'flakeWrapper',

    initialize: function(options) {
        this.durationInterval = null;

        var $flake = $('<div class="flake" />').css({
            'position': 'absolute',
            'top': '-50px'
        }),
            documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                flakeChar: "&#10052;",
                minSize: 15,
                maxSize: 25,
                newOn: 200,
                flakeColor: ["#ffffff"],
                durationFall: 4000,
                durationMillis: null
            },
            options = $.extend({}, defaults, options);

        this.height = documentHeight * 0.85;
        this.width = documentWidth;
        this.durationFall = options.durationFall;
        $flake.html(options.flakeChar);
        this.$el.css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'height': this.height,
            'width': '100%'
        });

        var _this = this;
        this.interval = setInterval(function() {
            var startPositionLeft = Math.random() * documentWidth - 100,
                startOpacity = 0.9 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = _this.height - defaults.maxSize - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 200,
                //durationFall = _this.height * 10 + Math.random() * 5000;
                durationFall = (0.5 + Math.random()) * _this.durationFall;
            $flake
                .clone()
                .appendTo(_this.$el[0])
                .css({
                    left: startPositionLeft,
                    opacity: startOpacity,
                    'font-size': sizeFlake,
                    color: options.flakeColor[Math.floor((Math.random() * options.flakeColor.length))]
                })
                .animate({
                        top: endPositionTop,
                        left: endPositionLeft,
                        opacity: 0.2
                    },
                    durationFall,
                    'linear',
                    function() {
                        $(this).remove()
                    }
            );
        }, options.newOn);

        if (options.durationMillis) {
            this.durationInterval = setTimeout(function() {
                removeInterval(interval);
            }, options.durationMillis);
        }
    },

    destroy: function() {
        clearInterval(this.interval);
        if (this.durationInterval) {
            clearInterval(this.durationInterval);
        }

        this.$el.detach();
    }
});

module.exports = Snow;
