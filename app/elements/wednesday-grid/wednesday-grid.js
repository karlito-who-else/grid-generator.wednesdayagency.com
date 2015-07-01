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

    // renderToImage: function(event) {
    renderToImage: function() {
      console.log('renderToImage');
      var _this = this;
      var breakpoints = document.querySelector('wednesday-breakpoints').breakpoints;
      // var link = event.target;

      // function downloadCanvas(link, canvas, filename) {
      //   link.href = canvas.toDataURL();
      //   link.download = filename;
      // }

      (function renderBreakpoint (i) {
        var breakpointIndex = i - 1;

        Polymer.dom(_this.$.grid).node.style.width = breakpoints[breakpointIndex].viewport + 'px';
        Polymer.dom(_this.$.title).node.innerHTML = breakpoints[breakpointIndex].viewport + 'px';

        // html2canvas(grid).then(function(canvas) {
        //   console.log('then', canvas);
        //   window.open(canvas.toDataURL(), 'grid - ' + breakpoints[breakpointIndex].viewport + 'px');
        // });

        setTimeout(html2canvas([_this.$.grid], {
          logging: true,
          onrendered: function(canvas) {
            // downloadCanvas(link, canvas, 'screenshot.png');
            window.open(canvas.toDataURL('image/png', 1.0), 'grid - ' + breakpoints[breakpointIndex].viewport + 'px');
          }
        }), 50);

        setTimeout(function() {
          if (--i) {
            renderBreakpoint(i);
          } else {
            Polymer.dom(_this.$.grid).node.style.width = 'auto';
            Polymer.dom(_this.$.title).node.innerHTML = null;
          }
        }, 250);

      })(breakpoints.length);

    }
  });
})();
