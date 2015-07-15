'use strict';

(function() {
  Polymer({
    is: 'wednesday-column',

    ready: function() {

    },

    toggleNestedGridVisibility: function() {
      console.log('toggleNestedGridVisibility');
      var classList = Polymer.dom(this).node.classList;
      classList.toggle('show-nested-grid');
    },

    toggleOutlineVisibility: function() {
      console.log('toggleOutlineVisibility');
      var classList = Polymer.dom(this).node.classList;
      classList.toggle('show-outline');
    }

  });
})();
