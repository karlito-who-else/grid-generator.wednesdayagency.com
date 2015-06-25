'use strict';

(function() {
  Polymer({
    is: 'wednesday-grid',
    properties: {
      // class: {
      //   type: String,
      //   value: ''
      // }
      method: {
        type: String,
        value: ''
      }
    },
    ready: function() {
      var classList = Polymer.dom(this).node.classList;

      // console.log('class', this.class);

      // console.log('classList', classList);

      // classList.forEach(function(className) {
      //   console.log('className', className);
      // });

      this.items = Array.prototype.slice.call(classList);

      var grid = this.$.grid;
      grid.style.display = 'none';

      console.log('this.layout', this.layout);

      var containers = Polymer.dom(this.root).querySelectorAll('.container');

      if (this.method === 'fluid') {
        for (var i = 0; i < containers.length; i++) {
          // containers[i].toggleDangerVisibility();
          containers.classList.toggle('container');
          containers.classList.toggle('container-fluid');
        }
      }

    },

    toggleGridVisibility: function() {
      // console.log('toggleGridVisibility grid');
      var grid = this.$.grid;
      grid.style.display = (grid.style.display !== 'none' ? 'none' : '');
    },

    toggleDangerVisibility: function() {
      // console.log('toggleDangerVisibility grid');
      var wednesdayCell = Polymer.dom(this.root).querySelectorAll('wednesday-cell');
      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleDangerVisibility();
      }
    },

    toggleLabelVisibility: function() {
      // console.log('toggleLabelVisibility grid');
      var wednesdayCell = Polymer.dom(this.root).querySelectorAll('wednesday-cell');
      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLabelVisibility();
      }
    }

  });
})();
