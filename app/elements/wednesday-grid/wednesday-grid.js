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
        notify: true,
        observer: 'observeGrid'
      },
      container: {
        type: String,
        notify: true,
        observer: 'observeContainer'
      }
    },

    ready: function() {
      console.log('ready');

      this.columns = 12;
      this.nestedGridVisibility = 'main';
      this.gutterWidth = 30;
      this.outlineVisibility = true;

      if (this.bootstrapVariablesRun !== true) {
        this.bootstrapVariables();
      }
      this.bootstrapContainerTypes();
      this.bootstrapGridClass();
      this.applyStyles();
    },

    bootstrapVariables: function() {
      console.log('bootstrapVariables');

      this.codePreview = Polymer.dom(this.root).querySelector('code');
      this.gridContainerRow = Polymer.dom(this.root).querySelector('#grid-container .row');
      this.spinner = Polymer.dom(this.root).querySelector('paper-spinner');
      this.bootstrapVariablesRun = true;
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

      // this.$.grid.classList.toggle('show-main-grid');
    },

    applyStyles: function() {
      console.log('applyStyles');

      if (typeof this.columns === 'undefined') {
        this.columns = 0;
      }

      if (typeof this.gutterWidth === 'undefined') {
        this.gutterWidth = 0;
      }

      this.$.main.classList.add('hidden');

      this.spinner.active = true;

      this.generateColumns();
      this.renderSass();
    },

    generateColumns: function() {
      let fragment = document.createDocumentFragment();

      this.gridContainerRow.innerHTML = '';

      for (let i = 0; i < this.columns; i++) {
        let column = document.createElement('wednesday-column');
        column.classList.add('col-xs-2', 'col-sm-1', 'show-outline');

        fragment.appendChild(column);

        if (i + 1 === this.columns) {
          this.gridContainerRow.appendChild(fragment);
        }
      }
    },

    observeColumns: function(newValue, oldValue) {
      console.log('observeColumns', 'newValue', newValue, 'oldValue', oldValue);

      if (this.bootstrapVariablesRun !== true) {
        this.bootstrapVariables();
      }

      this.cancelDebouncer('applyStyles');
      this.debounce('applyStyles', function() {
        this.applyStyles();
      }, 500);
    },

    observeGutterWidth: function(newValue, oldValue) {
      console.log('observeGutterWidth', 'newValue', newValue, 'oldValue', oldValue);

      if (this.bootstrapVariablesRun !== true) {
        this.bootstrapVariables();
      }

      this.cancelDebouncer('applyStyles');
      this.debounce('applyStyles', function() {
        this.applyStyles();
      }, 500);
    },

    observeGrid: function(newValue, oldValue) {
      console.log('observeGrid', 'newValue', newValue, 'oldValue', oldValue);

      if (this.bootstrapVariablesRun !== true) {
        this.bootstrapVariables();
      }

      this.cancelDebouncer('applyStyles');
      this.debounce('applyStyles', function() {
        this.applyStyles();
      }, 500);
    },

    observeContainer: function(newValue, oldValue) {
      console.log('observeContainer', 'newValue', newValue, 'oldValue', oldValue);

      if (this.bootstrapVariablesRun !== true) {
        this.bootstrapVariables();
      }

      this.cancelDebouncer('applyStyles');
      this.debounce('applyStyles', function() {
        this.applyStyles();
      }, 500);
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
          '/screenshot.html?columns=' + _this.columns + '&container-type=' + containerType + '&nested=' + _this.nestedGridVisibility + '&width=' + breakpoints[i].viewport,
          'grid - ' + breakpoints[i].viewport + 'px',
          'titlebar=grid - ' + breakpoints[i].viewport + 'px, ' +
          'height=900px,' +
          'width=' + breakpoints[i].viewport + 'px'
        );
      }

    },

    renderSass: function() {
      let _this = this;

      function addStyles(compilationResult) {
        // console.log('addStyles', compilationResult);
        let dynamicStyle = _this.$.dynamic;

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
          _this.spinner.active = false;
        }, 3000);

      }

      Sass.setWorkerUrl('/bower_components/sass.js/dist/sass.worker.js');

      var sass = new Sass();

      var customScss = '$grid-gutter-width: ' + this.gutterWidth.toString() + 'px !default;\n' +
      '$grid-columns: ' + this.columns.toString() + ' !default; ';

      var allScss;

      sass.preloadFiles('/styles/sass/', '', ['sass-for-browser.scss'], function() {

        sass.readFile('sass-for-browser.scss', function(baseScss) {
          // console.log(baseScss);

          allScss = customScss.concat(baseScss);

          sass.compile(allScss, addStyles);

          _this.codePreview.innerHTML = customScss;
        });

      });
    },

    toggleCodeVisibility: function() {
      console.log('toggleCodeVisibility');

      this.codePreview.style.display = (this.codePreview.style.display !== 'none' ? 'none' : '');
    },

    toggleExampleContentVisibility: function() {
      console.log('toggleExampleContentVisibility');

      this.$.example.style.display = (this.$.example.style.display !== 'none' ? 'none' : '');
    },

    toggleGridVisibility: function() {
      console.log('toggleGridVisibility');

      this.gridVisibility = (this.gridVisibility !== true ? true : false);

      this.$.grid.style.display = (this.$.grid.style.display !== 'none' ? 'none' : '');
    },

    toggleLabelVisibility: function() {
      console.log('toggleLabelVisibility');

      this.labelVisibility = (this.labelVisibility !== true ? true : false);

      var wednesdayCell = Polymer.dom(this.$.content).querySelectorAll('wednesday-cell');

      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLabelVisibility();
      }
    },

    toggleLayoutWarningsVisibility: function() {
      console.log('toggleLayoutWarningsVisibility');

      this.layoutWarningsVisibility = (this.layoutWarningsVisibility !== true ? true : false);

      var wednesdayCell = Polymer.dom(this.$.content).querySelectorAll('wednesday-cell');

      for (var i = 0; i < wednesdayCell.length; i++) {
        wednesdayCell[i].toggleLayoutWarningsVisibility();
      }
    },

    toggleNestedGridVisibility: function() {
      console.log('toggleNestedGridVisibility');

      this.nestedGridVisibility = (this.nestedGridVisibility !== true ? true : false);

      var wednesdayColumn = Polymer.dom(this.$.grid).querySelectorAll('wednesday-column');

      for (var i = 0; i < wednesdayColumn.length; i++) {
        wednesdayColumn[i].toggleNestedGridVisibility();
      }
    },

    toggleOutlineVisibility: function() {
      console.log('toggleOutlineVisibility');

      this.outlineVisibility = (this.outlineVisibility !== true ? true : false);

      var wednesdayColumn = Polymer.dom(this.$.grid).querySelectorAll('wednesday-column');

      for (var i = 0; i < wednesdayColumn.length; i++) {
        wednesdayColumn[i].toggleOutlineVisibility();
      }
    }

  });
})();
