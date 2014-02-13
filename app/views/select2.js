export default Ember.TextField.extend({
	classNames: ['input-xlarge','bigdrop'],
	prompt: "Search",
	resource: null,
	displayKey: null,
	onSelect: null,
	pageSize: 5,
	didInsertElement: function() {	
		Ember.run.scheduleOnce('afterRender', this, 'setupSelect2');
	},
	setupSelect2: function() { 
		var self = this;

		this.$().select2({
			dropdownAutoWidth: true,
			placeholder: self.get('prompt'),
			minimumInputLength: 1,
			ajax: {
				url: "http://localhost:8000/api/" + self.get('resource'),
				dataType: 'json',
				quietMillis: 100,
				data: function (term, page) {
					return {
									q: term,
									page_limit: self.get('pageSize'),
			            page: page
			        };
				},
				results: function (json, page) {
					var more = (page * self.get('pageSize')) < json.meta.total;
					return {
						results: json[self.get('resource')],
						more: more
					};
				}
			},
			formatResult: function(modelJSON) {	
				return modelJSON[self.get('displayKey')];
			},
			formatSelection: function(modelJSON) {
				self.sendAction('onSelect', modelJSON);
				//self.get('controller').send('setItem', modelJSON);
				return modelJSON[self.get('displayKey')];
			}
		});
	},
	willDestroyElement: function () {
		this.$().select2("destroy");
	}
});
