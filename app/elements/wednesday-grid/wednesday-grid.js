'use strict';

(function() {
  Polymer({
    is: 'wednesday-grid',

    properties: {
      columns: {
        type: Number,
        notify: true,
        observer: 'observeColumns'
      },
      gutterWidth: {
        type: Number,
        notify: true,
        observer: 'observeGutterWidth'
      },
      grid: {
        type: String,
        notify: true
        // observer: 'observeGrid'
      },
      container: {
        type: String,
        notify: true
        // observer: 'observeContainer'
      }
    },

    ready: function() {
      this.columns = 12;
      this.nestedGridVisibility = 'main';
      this.gutterWidth = 30;
      this.outlineVisibility = true;

      this.bootstrapContainerTypes();
      this.bootstrapGridClass();
      // this.applyStyles();
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

    applyStyles: function() {
      let _this = this;
      let dynamicStyle = this.$.dynamic;
      let spinner = Polymer.dom(this.root).querySelector('paper-spinner');

      // console.log('applyStyles', this.columns, this.gutterWidth);

      function addStyles(compilationResult) {
        // console.log('addStyles', compilationResult);

        if (dynamicStyle.styleSheet) {
          // console.log('Adding style via element.styleSheet');
          dynamicStyle.styleSheet.cssText = compilationResult.text;
        } else {
          // console.log('Adding style via element.appendChild');
          dynamicStyle.innerHTML = '';
          dynamicStyle.appendChild(document.createTextNode(compilationResult.text));
        }

        setTimeout(function() {
          _this.$.main.classList.remove('hidden');
          spinner.active = false;
        }, 3000);

      }

      Sass.setWorkerUrl('/bower_components/sass.js/dist/sass.worker.js');

      if (typeof this.columns === 'undefined') {
        this.columns = 0;
      }

      if (typeof this.gutterWidth === 'undefined') {
        this.gutterWidth = 0;
      }

      let codePreview = Polymer.dom(this.root).querySelector('code');

      // console.log('spinner', spinner);

      let gridContainerRow = Polymer.dom(this.root).querySelector('#grid .container .row');
      // console.log('gridContainerRow', gridContainerRow);

      // const wednesdayColumn = Polymer.dom(this.root).querySelector('template#column').content;
      // const wednesdayColumn = document.querySelector('template#column').content;

      // console.log('wednesdayColumn', wednesdayColumn);

      // let columns = this.$.grid.querySelectorAll('.main-grid');

      // let maxColumns = (parseInt(this.columns) < columns.length) ? parseInt(this.columns) : columns.length;

      let fragment = document.createDocumentFragment();

      this.$.main.classList.add('hidden');
      spinner.active = true;

      gridContainerRow.innerHTML = '';

      for (let i = 0; i < this.columns; i++) { // hide all columns with an index greater than the amount we have specified
        let column = document.createElement('wednesday-column');

        fragment.appendChild(column);
        console.log('fragment', fragment);

        console.log('this.columns', this.columns, 'i', i);

        if (i + 1 === this.columns) {
          gridContainerRow.appendChild(fragment);
          console.log('gridContainerRow', gridContainerRow);
        }
      }

      // for (var i = maxColumns; i < columns.length; i++) { // hide all columns with an index greater than the amount we have specified
      //   columns[i].classList.add('hidden');
      // }

      var sass = new Sass();

      var customScss = '$grid-gutter-width: ' + this.gutterWidth.toString() + 'px !default;\n' +
      '$grid-columns: ' + this.columns.toString() + ' !default; ';

      var allScss;

      sass.preloadFiles('/styles/sass/', '', ['sass-for-browser.scss'], function() {

        sass.readFile('sass-for-browser.scss', function(baseScss) {
          // console.log(baseScss);

          allScss = customScss.concat(baseScss);

          sass.compile(allScss, addStyles);

          codePreview.innerHTML = customScss;
        });

      });

    },

    toggleExampleContentVisibility: function() {
      console.log('toggleExampleContentVisibility');
      this.$.example.style.display = (this.$.example.style.display !== 'none' ? 'none' : '');
    },

    toggleNestedGridVisibility: function() {
      console.log('toggleNestedGridVisibility');
      this.nestedGridVisibility = (this.outlineVisibility !== true ? true : false);

      console.log('toggleOutlineVisibility', this.outlineVisibility, typeof this.outlineVisibility);

      if (this.nestedGridVisibility === true) {
        console.log('add show-nested-grid class');
        this.$.grid.classList.add('show-nested-grid');
      } else {
        console.log('remove show-nested-grid class');
        this.$.grid.classList.remove('show-nested-grid');
      }

    },

    toggleOutlineVisibility: function() {
      this.outlineVisibility = (this.outlineVisibility !== true ? true : false);

      console.log('toggleOutlineVisibility', this.outlineVisibility, typeof this.outlineVisibility);

      if (this.outlineVisibility === true) {
        console.log('add show-outline class');
        this.$.grid.classList.add('show-outline');
      } else {
        console.log('remove show-outline class');
        this.$.grid.classList.remove('show-outline');
      }

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

    observeColumns: function(newValue, oldValue) {
      console.log('newValue', newValue);
      console.log('oldValue', oldValue);
      this.cancelDebouncer('applyStyles');
      this.debounce('applyStyles', function() {
        this.applyStyles();
      }, 500);
    },

    observeGutterWidth: function(newValue, oldValue) {
      console.log('newValue', newValue);
      console.log('oldValue', oldValue);
      this.applyStyles();
    },

    observeGrid: function(newValue, oldValue) {
      console.log('newValue', newValue);
      console.log('oldValue', oldValue);
      this.applyStyles();
    },

    observeContainer: function(newValue, oldValue) {
      console.log('newValue', newValue);
      console.log('oldValue', oldValue);
      // this.applyStyles();
    },

    renderToImage: function(event) {
      console.log('renderToImage');
      var _this = this;
      var breakpoints = document.querySelector('wednesday-breakpoints').breakpoints;
      var classList = event.target.closest('wednesday-grid').querySelector('#grid .container').classList;
      var containerType = 'container';

      if (classList.contains('container')) {
        containerType = 'container';
      } else if (classList.contains('container-fluid')) {
        containerType = 'container-fluid';
      }

      for (var i = 0; i < breakpoints.length; i++) {
        window.open(
          '/screenshot.html?columns=' + _this.nestedGridVisibility + '&container-type=' + containerType + '&width=' + breakpoints[i].viewport,
          'grid - ' + breakpoints[i].viewport + 'px',
          'titlebar=grid - ' + breakpoints[i].viewport + 'px, ' +
          'height=500px,' +
          'width=' + breakpoints[i].viewport + 'px'
        );
      }

    }
  });
})();
