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

      var classArray = Array.prototype.slice.call(classList);

      // this.items = classArray;

      this.items = [];

      for (var i = 0; i < classArray.length; i++) {
        // console.log('label', classArray[i]);
        this.push('items', { name: classArray[i], display: 'none' });
      }
    },

    isManuallyAssigned: function(item) {
      return item.name !== 'style-scope' && item.name !== 'wednesday-grid' && item.name !== 'danger';
    },

    toggleDangerVisibility: function() {
      var classList = Polymer.dom(this).node.classList;
      var danger = classList.contains('danger');
      // console.log('toggleLabelVisibility cell danger', danger);
      if(!danger) {
        return;
      }
      classList.toggle('warn-danger');
    },

    toggleLabelVisibility: function() {
      var labels = this.$.labels;
      // console.log('toggleLabelVisibility cell labels', this.items);
      for (var i = 0; i < this.items.length; i++) {
        console.log('label', this.items[i]);
        this.set('items.' + i + '.item.display', 'spispopd');
        // this.items[i].style.display = (this.items[i].style.display !== 'none' ? 'none' : '');
      }
      // this.set('employees.0.manager.type', 'engineer');
      // var label = this.$.label;
      // console.log('toggleLabelVisibility cell', label);
      // label.style.display = (label.style.display !== 'none' ? 'none' : '');
      // console.log('toggleLabelVisibility cell style', label.style);
    }

  });
})();
