

/**
 *
 * Accordion
 *
 */
var Accordion = function () {
	this.init();
}

Accordion.prototype = {
	enabled: null,

	init: function () {
		var self = this;
		if (!$('.js-accordion')[0]) return;

		$('.js-accordion').each(function (i) {
			$(this).data('accordion', new AccordionCore(this));
		});

		//anchor open
		$('.js-accordion-open').on('click.Accordion', function () {
			$($(this).attr('href')).trigger('open.accordion');
		})

		//hash open
		var hash = window.location.hash;
		$(hash).trigger('open.accordion');
	}
}

var AccordionCore = function (target) {
	this.init(target);
};

AccordionCore.prototype = {
	enabled: null,

	init: function (target) {
		var self = this;
		this.$accordion = $(target);
		this.$trigger = this.$accordion.find('.js-accordion__trigger');
		this.$triggersc = this.$accordion.find('.js-accordion__trigger_scroll');
		this.$body = this.$accordion.find('.js-accordion__body');

		this.enable();
		this.eventSetup();

	},

	enable: function () {
		var self = this;
		if (!this.enabled) {
			this.enabled = true;
			if (this.$accordion.hasClass('is-closed')) {
				this.$body.css({ display: 'none' });
			}
			this.$trigger.on('click.Accordion', function (e) {
				self.toggle();
				return false;
			});
			this.$triggersc.on('click.Accordion', function (e) {
				self.toggle();
				$('body, html').stop().animate({ scrollTop: Math.round(self.$accordion.offset().top) }, { duration: 400, easing: 'swing' });
				return false;
			});
		}
	},

	disable: function () {
		if (this.enabled) {
			this.enabled = false;
			this.$body.css({ display: 'block' });
			this.$trigger.off('click.Accordion');
		}
	},

	toggle: function () {
		var self = this;
		if (this.$body.is(':visible')) {
			this.close();
		} else {
			this.open();
		}
	},

	open: function () {
		this.$body.slideDown(400);
		this.$accordion.removeClass('is-closed');
	},

	close: function () {
		this.$body.slideUp(400);
		this.$accordion.addClass('is-closed');
	},

	eventSetup: function () {
		var self = this;
		this.$accordion.on('open.accordion', function () {
			self.open();
		})
		this.$accordion.on('close.accordion', function () {
			self.close();
		})
	}

}

$(function() {
	// Product more
	$('.product').each(function(e){
		var root = $(this);
		var btn = root.find('.product_more button');
		btn.on('click', function(e) {
			e.preventDefault();
			root.find('.product_block').fadeIn();
			$(this).hide();
		})
	});
	
	//Accordion
	var accordion = new Accordion();
});

// Tab Content
$(function() {
  const tabButtons = document.querySelectorAll('.tab_btn');
  const tabContents = document.querySelectorAll('.tab_content');

  function activateTab(tabId) {
    if (!tabId) return;

    // Delete active class
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active to tab and corresponding content
    const targetBtn = document.querySelector(`.tab_btn[data-tab="${tabId}"]`);
    const targetContent = document.getElementById(tabId);

    if (targetBtn && targetContent) {
      targetBtn.classList.add('active');
      targetContent.classList.add('active');
    }
  }

  // Attach click event
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = button.getAttribute('data-tab');
      activateTab(tabId);
    });
  });
});