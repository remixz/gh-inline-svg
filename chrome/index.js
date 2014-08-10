/**
 * GitHub Inline SVG
 * Shows an inline preview of SVG files on GitHub
 *
 * @author Zach Bruggeman <mail@bruggie.com>
 */

var textToSvg = function () {
    var lines = [].slice.call(document.querySelectorAll('.blob-wrapper table td.blob-line-code'));
    if (lines.length === 0) return; // chrome calls the event twice, the first time being immediately after click, when nothing is loaded

    var svgText = '';
    lines.forEach(function (line) {
        svgText += line.innerText;
    });

    var parser = new DOMParser();
    var svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

    var editor = document.querySelector('.blob-wrapper table');
    editor.style.display = 'none';

    var divWrapper = document.createElement('div');
    divWrapper.className = 'image';

    var spanWrapper = document.createElement('span');
    spanWrapper.className = 'border-wrap';
    spanWrapper.style.background = 'url("/images/modules/commit/trans_bg.gif?85d532e0") right bottom #eee';

    spanWrapper.appendChild(svgDoc.querySelector('svg'));
    divWrapper.appendChild(spanWrapper);
    document.querySelector('.blob-wrapper').appendChild(divWrapper);

    var rawButton = document.querySelector('#raw-url');
    var toggleButton = document.createElement('a');
    toggleButton.className = 'minibutton';
    toggleButton.innerText = 'Toggle Inline SVG';
    rawButton.parentNode.insertBefore(toggleButton, rawButton);

    toggleButton.addEventListener('click', function () {
        if (editor.style.display === 'none') {
            editor.style.display = 'table';
            divWrapper.style.display = 'none';
        } else {
            editor.style.display = 'none';
            divWrapper.style.display = 'block';
        }
    });
}

var checkUrl = function () {
    var path = window.location.pathname;
    var isSvgBlob = (path.indexOf('/blob/') !== -1 && path.slice(-4) === '.svg');

    if (isSvgBlob) textToSvg();
}

chrome.runtime.onMessage.addListener(checkUrl);
