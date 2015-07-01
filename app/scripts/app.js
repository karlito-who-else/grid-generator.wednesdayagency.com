'use strict';

/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // var forEach = function (array, callback, scope) {
  //   for (var i = 0; i < array.length; i++) {
  //     callback.call(scope, i, array[i]); // passes back stuff we need
  //   }
  // };

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.toggleGridVisibility = function() {
    console.log('toggleGridVisibility global');
    var wednesdayGrid = document.querySelectorAll('wednesday-grid');
    for (var i = 0; i < wednesdayGrid.length; i++) {
      wednesdayGrid[i].toggleGridVisibility();
    }
  };

  app.toggleGridColumnAmount = function() {
    console.log('toggleGridColumnAmount global');
    var wednesdayGrid = document.querySelectorAll('wednesday-grid');
    for (var i = 0; i < wednesdayGrid.length; i++) {
      wednesdayGrid[i].toggleGridColumnAmount();
    }
  };

  app.toggleExampleContentVisibility = function() {
    console.log('toggleExampleContentVisibility global');
    var wednesdayGrid = document.querySelectorAll('wednesday-grid');
    for (var i = 0; i < wednesdayGrid.length; i++) {
      wednesdayGrid[i].toggleExampleContentVisibility();
    }
  };

  app.toggleLabelVisibility = function() {
    console.log('toggleLabelVisibility global');
    var wednesdayGrid = document.querySelectorAll('wednesday-grid');
    for (var i = 0; i < wednesdayGrid.length; i++) {
      wednesdayGrid[i].toggleLabelVisibility();
    }
  };

  app.toggleLayoutWarningsVisibility = function() {
    console.log('toggleLayoutWarningsVisibility global');
    var wednesdayGrid = document.querySelectorAll('wednesday-grid');
    for (var i = 0; i < wednesdayGrid.length; i++) {
      wednesdayGrid[i].toggleLayoutWarningsVisibility();
    }
  };

  app.addMediaQueryInputFieldset = function() {
    console.log('toggleLayoutWarningsVisibility global');
    
  };

  app.generateStyleElements = function() {
    console.log('generateStyleElements global');
    var breakPoints = document.querySelectorAll('input.breakpoint');
    for (var i = 0; i < breakPoints.length; i++) {
      var newStyle = document.querySelector('head').createElement('style');
      newStyle.id = 'media-query-' + breakPoints[i].value;
      document.querySelector('style').textContent += '@media screen and (min-width:' + breakPoints[i].value + 'px) { div { color: red; } }';
    }
  };

})(document);
