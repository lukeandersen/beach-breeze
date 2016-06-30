
/**!
 * reactornav - modified superfish v1.6.9
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

;(function($) {
	$.fn.reactornav = function(op) {

		var rn = $.fn.reactornav,
			c = rn.c,
			over = function() {
				var $this = $(this),
					o = getOptions($this);

				clearTimeout(o.rnTimer);
				$this.showreactornavUl().siblings().hidereactornavUl();
			},
			out = function(e) {
				var $this = $(this),
					o = getOptions($this);

				if (e.type === 'click' || rn.ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.rnTimer);
					o.rnTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function(o) {
				o.retainPath = ( $.inArray(this[0], o.$path) > -1);
				this.hidereactornavUl();

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function($el) {
				return getMenu($el).data('rn-options');
			},
			applyTouchAction = function($menu) {
				// needed by MS pointer events
				$menu.css('ms-touch-action', 'none');
			},
			applyHandlers = function($menu,o) {
				var targets = 'li:has(ul)';

				if (!o.useClick) {
					if ($.fn.hoverIntent && !o.disableHI) {
						$menu.hoverIntent(over, out, targets);
					}
					else {
						$menu
							.on('mouseenter', targets, over)
							.on('mouseleave', targets, out);
					}
				}
				var touchstart = 'MSPointerDown';

				if (!rn.ios) {
					touchstart += ' touchstart';
				}
				if (rn.wp7) {
					touchstart += ' mousedown';
				}
				$menu
					.on('focusin', 'li', over)
					.on('focusout', 'li', out)
					.on('click', 'a', o, clickHandler)
					.on(touchstart, 'a', touchHandler);
			},
			touchHandler = function(e) {
				var $this = $(this),
					$ul = $this.siblings('ul');

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.data('follow', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
						return false;
					}
				}
			},
			clickHandler = function(e) {
				var $a = $(this),
					o = e.data,
					$submenu = $a.siblings('ul'),
					follow = ($a.data('follow') === false) ? false : true;

				if ($submenu.length && (o.useClick || !follow)) {
					e.preventDefault();
					if ($submenu.is(':hidden')) {
						$.proxy(over, $a.parent('li'))();
					}
					else if (o.useClick && follow) {
						$.proxy(out, $a.parent('li'), e)();
					}
				}
			},
			setPathToCurrent = function($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function() {
							return ($(this).children('ul').hide().show().length);
						}).removeClass(o.pathClass);
			}

		rn.getOptions = getOptions;

		return this.addClass(c.menuClass).each(function() {
			var $this = $(this),
				o = $.extend({}, rn.defaults, op),
				$liHasUl = $this.find('li:has(ul)');

			o.$path = setPathToCurrent($this, o);

			$this.data('rn-options', o);

			applyTouchAction($this);
			applyHandlers($this, o);

			$liHasUl.not('.' + c.bcClass).hidereactornavUl(true);

			o.onInit.call(this);
		});
	};

	var rn = $.fn.reactornav;
	rn.o = [];
	rn.op = {};

	rn.c = {
		bcClass: 'navigation-breadcrumb',
		menuClass: 'navigation-js-enabled',
		anchorClass: 'navigation-with-ul'
	};
	rn.defaults = {
		hoverClass: 'hover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 300,
		animation: {opacity:'show'},
		animationOut: {opacity:'hide'},
		speed: 'fast',
		speedOut: 0,
		disableHI: false, // true disables hoverIntent detection
		useClick: false,
		onInit: $.noop, // callback functions
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop
	};
	rn.ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	rn.wp7 = (function() {
		var style = document.documentElement.style;
		return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
	})();
	$.fn.extend({
		hidereactornavUl: function(instant) {
			if (this.length) {
				var $this = this,
					o = rn.getOptions($this),
					not = (o.retainPath === true) ? o.$path : '',
					$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children('ul').attr('aria-expanded', 'false').attr('aria-hidden', 'true'),
					// Mega menu update childen('ul') above to mega wrapper div class
					speed = o.speedOut;

				if (instant) {
					$ul.show();
					speed = 0;
				}
				o.retainPath = false;
				o.onBeforeHide.call($ul);
				$ul.stop(true, true).animate(o.animationOut, speed, function() {
					var $this = $(this);
					o.onHide.call($this);
					if (o.useClick) {
						$this.siblings('a').data('follow', false);
					}
				});
			}
			return this;
		},
		showreactornavUl: function() {
			var o = rn.getOptions(this),
				$this = this.addClass(o.hoverClass),
				$ul = $this.children('ul').attr('aria-expanded', 'true').removeAttr('aria-hidden');

			o.onBeforeShow.call($ul);
			$ul.stop(true, true).animate(o.animation, o.speed, function() {
				o.onShow.call($ul);
				$this.children('a').data('follow', true);
			});
			return this;
		}
	});

	if (rn.ios) {
		// iOS click won't bubble to body, attach to closest possible
		$(window).load(function() {
			$('body').children().on('click', $.noop);
		});
	}

})(jQuery);