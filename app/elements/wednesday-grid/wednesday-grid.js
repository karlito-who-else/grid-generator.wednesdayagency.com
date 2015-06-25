'use strict';

(function() {
  Polymer({
    is: 'wednesday-grid',
    properties: {
      // class: {
      //   type: String,
      //   value: ''
      // }
      container: {
        type: String,
        value: ''
      },
      grid: {
        type: Number,
        value: null
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

      console.log('this.container', this.container);

      var containers = Polymer.dom(this.root).querySelectorAll('.container');

      for (var i = 0; i < containers.length; i++) {

        containers[i].classList.add('container-' + this.container);

        switch (this.container) {
          case 'fluid':
          case 'responsive':
            containers[i].classList.remove('container');
            containers[i].classList.add('container-fluid');
          break;
        }

      }

    },

    toggleGridColumns: function() {
      switch (this.grid) {
        case null:
          this.grid = 12;
        break;
        case 12:
          this.grid = 24;
        break;
        case 24:
          this.grid = null;
        break;
      }

      console.log('this.grid', this.grid);

      var containers = Polymer.dom(this.root).querySelectorAll('.container');
      
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
