'use strict';

(function() {
  Polymer({
    is: 'wednesday-cell',
    // properties: {
    //   class: {
    //     type: String,
    //     value: ''
    //   }
    // },
    ready: function() {
      var classList = Polymer.dom(this).node.classList;

      // console.log('class', this.class);

      // console.log('classList', classList);

      // classList.forEach(function(className) {
      //   console.log('className', className);
      // });

      this.items = Array.prototype.slice.call(classList);
    },

    isManuallyAssigned: function(item) {
      return item !== 'style-scope' && item !== 'wednesday-grid' && item !== 'danger';
    },

    toggleLabelVisibility: function() {
      console.log('toggleLabelVisibility cell');
      var label = document.getElementById('label');
      label.style.display = (label.style.display !== 'none' ? 'none' : '');
    }

  });
})();
