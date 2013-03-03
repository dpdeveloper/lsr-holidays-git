describe("DealSlideshowItemView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/home/deal.slideshow.item.view',
			'models/content/deal'
			], function(Backbone, Marionette, DealSlideshowItemView, ContentDeal) {
			
			var c = new ContentDeal();
			c.set({"title":"Sample Deal","overview":"&lt;p&gt;&lt;strong&gt;5 nights &lt;/strong&gt;in&lt;/p&gt;\n\n&lt;h2&gt;Dubai&lt;/h2&gt;\n\n&lt;h3&gt;For &lt;strong&gt;£999&lt;/strong&gt;&lt;/h3&gt;\n","image":{"id":2,"title":"Sample ","filename":"space-starts-galaxy-shuttersto-512b17c3b17a4.jpg","path":"/uploads/images","height":1640,"width":2460},"order":1,"published":"Yes","description":"&lt;h1&gt;Have the time of your life!&lt;/h1&gt;\n\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel nunc eros, eget aliquet ante. Sed auctor bibendum rutrum. Pellentesque ac pretium nulla. Ut laoreet magna dui, vel imperdiet nisi. Integer mollis mattis risus at malesuada. Sed a nunc velit.&lt;/p&gt;\n"});
			
			that.view = new DealSlideshowItemView({model: c});
			
			that.region = new Backbone.Marionette.Region({el: '#sandbox'});
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		this.region.close();
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Initializes', function(){
		it('Is Not Null', function(){
			expect(this.view).not.toBeNull();
		});
		it('Can Add to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
	});
});
