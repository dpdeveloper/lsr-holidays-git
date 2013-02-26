/* models/static-content
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','config'
], function($,_,Backbone,config){

	var StaticContent = Backbone.Model.extend({
		_url: 'json/static-content/',
		_root: config['root'],
		_data: [],
		_isLoaded: false,
		_loadDelegate: null,
		_loadDelegateContext: null,
		
		initialize: function(){
			_.bindAll(this);
		},
		
		/* load
		 *
		 * Loads the static content from the server
		 *
		*/
		load: function(){
			var self = this;
			this._isLoaded = false;
			
			$.ajax({
				url: this._root+this._url,
				dataType: 'text',
				success: function(data){
					data = data.replace(/(\r\n|\n|\r)/gm,"");
					data = data.replace(/\s+/g, ' ');
					
					self._isLoaded = true;
					self._data = $.parseJSON(data);
					
					self.trigger('loaded');
					
					if(self._loadDelegate!=null){
						self._loadDelegate.apply(self._loadDelegateContext);
						self._loadDelegate = null;
						self._loadDelegateContext = null;
					}
				},
				error: function(jx,textStatus,error){
					console.log(textStatus);
				}
			});
		},
		
		/* callWhenLoaded(fx)
		 *
		 * @context: the 'this' context
		 * @fx: the function to acll
		 *
		 * Calls the function when loading has occured. Or calls now if loaded
		 *
		*/
		callWhenLoaded: function(context, fx){
		
			if(this._isLoaded){
				fx.apply(context);
			}
			else{
				this._loadDelegate = fx;
				this._loadDelegateContext = context;
			}
		},
		
		/* isLoaded()
		 *
		 * Returns value of this._isLoaded
		*/
		isLoaded: function(){
			return this._isLoaded;
		},
		
		/* all()
		 *
		 * Returns All Data
		*/
		all: function(){
			return this._data;
		},
		
		/* s
		 *
		 * @string: The array index to return
		 *
		 * Returns the array value from the data
		*/
		s: function(string){
			if(string in this._data){
				return this._data[string];
			}
			else{
				return "";
			}
		},
		
		/* ss
		 *
		 * @a: The first Index
		 * @b: The second index
		 *
		 * Returns this._data[a][b] if it exists 
		*/
		ss: function(a,b){
			if(a in this._data && b in this._data[a]){
				return this._data[a][b];
			}
			else{
				return "";
			}
		}
	});
	
	var sc = new StaticContent();
	sc.load();
	return sc;
});
	