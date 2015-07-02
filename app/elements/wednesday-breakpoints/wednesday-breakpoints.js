'use strict';

(function() {
  Polymer({
    is: 'wednesday-breakpoints',

    // properties: {
    //   breakpoints: {
    //     type: Array
    //   }
    // },

    ready: function() {
      // this.breakpoints = [];
      this.initializeDefaultBreakpoints();
      // var breakpoints = Polymer.dom(this.root).querySelectorAll('wednesday-breakpoint');
      // var breakpoint = Polymer.dom(this.root).querySelector('wednesday-breakpoint');
      // breakpoint.querySelector('#breakpoint-number').innerHTML = (breakpoints.length);
    },

    initializeDefaultBreakpoints: function() {
      this.gridGutterWidth = 30;

      this.breakpoints = [
        {
          viewport: 320,
          grid: (290 + this.gridGutterWidth)
        },
        {
          viewport: 768,
          grid: (720 + this.gridGutterWidth)
        },
        {
          viewport: 992,
          grid: (940 + this.gridGutterWidth)
        },
        {
          viewport: 1200,
          grid: (1140 + this.gridGutterWidth)
        },
        {
          viewport: 1366,
          grid: (1336 + this.gridGutterWidth)
        }
      ];
    },

    addBreakpoint: function() {
      console.log('addBreakpoint');
      // var breakpoint = document.createElement('wednesday-breakpoint');
      // var breakpoints = Polymer.dom(this.root).querySelectorAll('wednesday-breakpoint');
      // breakpoint.querySelector('#breakpoint-number').innerHTML = (breakpoints.length + 1); // +1 as we've not yet inserted the element in order for it to be accounted for in the querySelector above
      // Polymer.dom(this.root).appendChild(breakpoint);

      // this.set('breakpoints.' + breakpoints.length + '.viewport', 599);
      // this.set('breakpoints.' + breakpoints.length + '.grid', 550);

      this.breakpoints.push({
        viewport: 1440,
        grid: (1380 + this.gridGutterWidth)
      });

      console.log('this.breakpoints', this.breakpoints);
    },

    breakpointId: function(index) {
      return 'breakpoint-' + index;
    }

  });
})();
