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
      this.$.grid.classList.toggle('show-12-columns');
    },

    toggleExampleContentVisibility: function() {
      console.log('toggleExampleContentVisibility');
      this.$.example.style.display = (this.$.example.style.display !== 'none' ? 'none' : '');
    },

    toggleGridColumnAmount: function() {
      console.log('toggleGridColumnAmount');
      this.$.grid.classList.toggle('show-12-columns');
      this.$.grid.classList.toggle('show-24-columns');
    },

    toggleGridVisibility: function() {
      console.log('toggleGridVisibility');
      this.$.grid.style.display = (this.$.grid.style.display !== 'none' ? 'none' : '');
    },

    toggleLayoutWarningsVisibility: function() {
      console.log('toggleLayoutWarningsVisibility');
      // var wednesdayCell = Polymer.dom(this.root).querySelectorAll('wednesday-cell');
      var wednesdayCell = Polymer.dom(this.$.content).querySelectorAll('wednesday-cell');
      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLayoutWarningsVisibility();
      }
    },

    toggleLabelVisibility: function() {
      console.log('toggleLabelVisibility');
      // var wednesdayCell = Polymer.dom(this.root).querySelectorAll('wednesday-cell');
      var wednesdayCell = Polymer.dom(this.$.content).querySelectorAll('wednesday-cell');
      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLabelVisibility();
      }
    },

    renderToImage: function(event) {
      console.log('renderToImage');
      var link = event.target;

      function downloadCanvas(link, canvas, filename) {
        link.href = canvas.toDataURL();
        link.download = filename;
      }

      html2canvas([this.$.grid], {
        logging: true,
        // allowTaint: true,
        useCORS: true,
        onrendered: function(canvas) {
          downloadCanvas(link, canvas, 'screenshot.png');
        }
      });
    }
  });
})();
