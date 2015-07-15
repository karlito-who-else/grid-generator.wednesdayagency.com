'use strict';

// http://localhost:7051/screenshot-responsive.html?columns=12&container-type=container-fluid&title=992px

(function(document) {

  function getQueryParameter(parameter) {
    let query = window.location.search.substring(1);
    let parameters = query.split('&');

    for (let i = 0; i < parameters.length; i++) {
      let pair = parameters[i].split('=');
      if (pair[0] === parameter) {
        return pair[1];
      }
    }

    return (false);
  }

  function generateColumns(columns) {
    let fragment = document.createDocumentFragment();

    let columnTemplate = document.querySelector('template#column').content;

    for (let i = 0; i < columns; i++) {
      console.log('i', i);
      // let column = document.createElement('wednesday-column');
      // column.classList.add('col-xs-2', 'col-sm-1', 'show-outline');
      //
      // fragment.appendChild(column);

      let clone = document.importNode(columnTemplate, true);
      fragment.appendChild(clone);

      if (i + 1 === columns) {
        console.log('fragment', fragment);
        document.querySelector('#grid-container .row').appendChild(fragment);
      }
    }
  };

  let columns = getQueryParameter('columns');
  let containerType = getQueryParameter('container-type');
  let nested = getQueryParameter('nested');
  let width = getQueryParameter('width');

  if (columns) {
    document.querySelector('#label-columns').innerHTML = columns;

    generateColumns(parseInt(columns));
  }

  if (containerType) {
    document.querySelector('#grid-container').classList.remove('container');
    document.querySelector('#grid-container').classList.add(containerType);
  }

  if (nested === 'true') {
    let nestedClassName = 'show-nested-columns';
    document.body.classList.add(nestedClassName);
  }

  if (width) {
    document.querySelector('#label-width').innerHTML = width + 'px';
  }

  if (width && columns) {
    console.log('nested', nested, nested === 'true');
    columns = (nested === 'true') ? (columns * 2) : columns;

    document.querySelector('title').innerHTML = 'Grid: ' + width + 'px ,' + columns + ' columns';
  }

  setTimeout(html2canvas([document.body], {
    logging: true,
    onrendered: function(canvas) {
      // window.location = canvas.toDataURL('image/png', 1.0);
    }
  }), 100);

})(document);
