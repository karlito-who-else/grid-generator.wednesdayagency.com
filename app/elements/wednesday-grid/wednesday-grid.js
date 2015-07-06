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
      this.columns = 12;
      this.grid = 'main';
      this.gutterWidth = 30;

      this.bootstrapContainerTypes();
      this.bootstrapGridClass();
      this.bootstrapSassJs();
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
      this.$.grid.classList.toggle('show-main-grid');
    },

    bootstrapSassJs: function() {

      function addStyles(compilationResult) {
        console.log('addStyles', compilationResult);

        if (dynamicStyle.styleSheet) {
          console.log('Adding style via element.styleSheet');
          dynamicStyle.styleSheet.cssText = compilationResult.text;
        } else {
          console.log('Adding style via element.appendChild');
          dynamicStyle.innerHTML = '';
          dynamicStyle.appendChild(document.createTextNode(compilationResult.text));
        }
      }

      Sass.setWorkerUrl('/bower_components/sass.js/dist/sass.worker.js');

      var _this = this;

      var dynamicStyle = this.$.dynamic;

      var sass = new Sass();

      var customScss = '#grid-container {background: red;}';

      var allScss;

      sass.preloadFiles('/styles/sass/', '', ['sass-for-browser.scss'], function() {

        sass.readFile('sass-for-browser.scss', function(baseScss) {
          // console.log(baseScss);

          allScss = customScss.concat(baseScss);

          sass.compile(allScss, addStyles);

          setTimeout(function() {
            customScss = '$grid-gutter-width: ' + _this.gutterWidth.toString() + 'px !default; ' +
            '$grid-columns: ' + _this.columns.toString() + ' !default; ' +
            '#grid-container {background: orange;}';

            allScss = customScss.concat(baseScss);

            sass.compile(allScss, addStyles);
          }, 5000);

        });

      });

    },

    toggleExampleContentVisibility: function() {
      console.log('toggleExampleContentVisibility');
      this.$.example.style.display = (this.$.example.style.display !== 'none' ? 'none' : '');
    },

    toggleGridColumnAmount: function() {
      console.log('toggleGridColumnAmount');
      this.grid = (this.grid !== 'nested' ? 'nested' : 'main');

      this.$.grid.classList.remove('show-main-grid');
      this.$.grid.classList.remove('show-nested-grid');

      this.$.grid.classList.add('show-' + this.grid + '-columns');
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
          '/screenshot.html?columns=' + _this.grid + '&container-type=' + containerType + '&width=' + breakpoints[i].viewport,
          'grid - ' + breakpoints[i].viewport + 'px',
          'titlebar=grid - ' + breakpoints[i].viewport + 'px, ' +
          'height=500px,' +
          'width=' + breakpoints[i].viewport + 'px'
        );
      }

    }
  });
})();
