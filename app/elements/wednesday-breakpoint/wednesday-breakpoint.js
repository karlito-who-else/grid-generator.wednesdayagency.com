'use strict';

(function() {
  Polymer({
    is: 'wednesday-breakpoint',

    properties: {
      index: {
        type: Number,
        value: null
      },
      viewport: {
        type: Number,
        value: null
      },
      grid: {
        type: Number,
        value: null
      }
    },

    ready: function() {

    },

    removeBreakpoint: function() {
      console.log('removeBreakpoint');
      this.remove();
    }

  });
})();
