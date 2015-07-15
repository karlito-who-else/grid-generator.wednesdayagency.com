'use strict';

(function() {
  Polymer({
    is: 'wednesday-grid-options',

    properties: {
      columns: {
        type: Number,
        notify: true
        // observer: 'observeColumns'
      },
      gutterWidth: {
        type: Number,
        notify: true
        // observer: 'observeGutterWidth'
      },
      grid: {
        type: String,
        notify: true
        // observer: 'observeGrid'
      }
    },

    ready: function() {
      this.columns = 12;
      this.gutterWidth = 30;
      this.grid = 'main';
    },

    logValues: function() {
      console.log('columns', this.columns);
      console.log('gutterWidth', this.gutterWidth);
      console.log('grid', this.grid);
    },

    logInput: function(event) {
      console.log('logInput', event);
      this.logValues();
    }

  });
})();
