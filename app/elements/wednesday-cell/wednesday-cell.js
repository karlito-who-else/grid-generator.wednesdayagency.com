'use strict';

(function() {
  Polymer({
    is: 'wednesday-cell',

    ready: function() {
      var classList = Polymer.dom(this).node.classList;
      var classArray = Array.prototype.slice.call(classList);

      this.labels = [];

      for (var i = 0; i < classArray.length; i++) {
        // console.log('label', classArray[i]);
        this.push('labels', { name: classArray[i] });
      }
    },

    isManuallyAssigned: function(label) {
      return label.name !== 'style-scope' && label.name !== 'wednesday-grid' && label.name !== 'danger';
    },

    toggleLayoutWarningsVisibility: function() {
      var classList = Polymer.dom(this).node.classList;
      var danger = classList.contains('danger');
      if (!danger) {
        return;
      }
      classList.toggle('warn-danger');
    },

    toggleLabelVisibility: function() {
      // this.$.list.style.textIndent = (this.$.list.style.textIndent !== '-9999px' ? '-9999px' : 0);
      this.$.list.style.color = (this.$.list.style.color !== 'transparent' ? 'transparent' : '');
    }

  });
})();
