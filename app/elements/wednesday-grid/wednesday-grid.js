'use strict';

(function() {
  Polymer({
    is: 'wednesday-grid',
    properties: {
      container: {
        type: String,
        value: ''
      }
    },

    ready: function() {
      this.bootstrapContainerTypes();
      this.bootstrapGridClass();
    },

    bootstrapContainerTypes: function() {
      console.log('bootstrapContainerTypes');
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

    bootstrapGridClass: function() {
      console.log('bootstrapGridClass');
      this.gridColumns = 12;
      this.$.grid.classList.toggle('show-12-columns');
    },

    toggleExampleContentVisibility: function() {
      console.log('toggleExampleContentVisibility');
      this.$.example.style.display = (this.$.example.style.display !== 'none' ? 'none' : '');
    },

    toggleGridColumnAmount: function() {
      console.log('toggleGridColumnAmount');
      this.gridColumns = (this.gridColumns !== 24 ? 24 : 12);

      this.$.grid.classList.remove('show-12-columns');
      this.$.grid.classList.remove('show-24-columns');

      this.$.grid.classList.add('show-' + this.gridColumns + '-columns');

      // this.$.grid.classList.toggle('show-12-columns');
      // this.$.grid.classList.toggle('show-24-columns');
    },

    toggleGridVisibility: function() {
      console.log('toggleGridVisibility');
      this.$.grid.style.display = (this.$.grid.style.display !== 'none' ? 'none' : '');
    },

    toggleLayoutWarningsVisibility: function() {
      console.log('toggleLayoutWarningsVisibility');
      // var wednesdayCell = Polymer.dom(this.root).querySelectorAll('wednesday-cell');
      var wednesdayCell = Polymer.dom(this.$.content).querySelectorAll('wednesday-cell');
      console.log('toggleLabelVisibility', this, this.$.content, wednesdayCell);
      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLayoutWarningsVisibility();
      }
    },

    toggleLabelVisibility: function() {
      console.log('toggleLabelVisibility');
      // var wednesdayCell = Polymer.dom(this.root).querySelectorAll('wednesday-cell');
      var wednesdayCell = Polymer.dom(this.$.content).querySelectorAll('wednesday-cell');
      console.log('toggleLabelVisibility', this, this.$.content, wednesdayCell);
      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLabelVisibility();
      }
    },

    renderToImage: function(event) {
      console.log('renderToImage');
      var _this = this;
      var breakpoints = document.querySelector('wednesday-breakpoints').breakpoints;
      var classList = event.target.closest('wednesday-grid').querySelector('#grid-container').classList;
      var containerType = 'container';

      if (classList.contains('container')) {
        containerType = 'container';
      } else if (classList.contains('container-fluid')) {
        containerType = 'container-fluid';
      }

      for (var i = 0; i < breakpoints.length; i++) {
        window.open(
          '/screenshot-responsive.html?columns=' + _this.gridColumns + '&container-type=' + containerType + '&title=' + breakpoints[i].viewport + 'px',
          'grid - ' + breakpoints[i].viewport + 'px',
          'titlebar=grid - ' + breakpoints[i].viewport + 'px, ' +
          'height=500px,' +
          'width=' + breakpoints[i].viewport + 'px'
        );
      }

    }
  });
})();
