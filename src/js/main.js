/* global Reveal */
/* global hljs */
/* global TEMPLATES */
/* global console */

(function() {
  'use scrict';

  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

    // Parallax scrolling
    // parallaxBackgroundImage: '../img/harmony-bg.jpg',
    // parallaxBackgroundSize: '2276px 1280px',

    // Optional libraries used to extend on reveal.js
    dependencies: [
      { src: 'js/lib/classList.min.js', condition: function() { return !document.body.classList; } },
      { src: 'js/plugin/markdown/marked.min.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: 'js/plugin/markdown/markdown.min.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
      { src: 'js/plugin/highlight/highlight.min.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
      { src: 'js/plugin/zoom-js/zoom.min.js', async: true, condition: function() { return !!document.body.classList; } },
      { src: 'js/plugin/notes/notes.min.js', async: true, condition: function() { return !!document.body.classList; } },
      { src: 'js/plugin/itemcloud/itemcloud.js', async: true, condition: function() { return document.querySelectorAll('[data-state="itemcloud"]'); } }
    ]
  });

  Reveal.addEventListener('ready', function() {
    'use strict';

    var footer = TEMPLATES.footer({
      title: '@@title'
    });

    var sectionEls = document.querySelectorAll('section:not(.stack)');
    var sections = Array.prototype.slice.call(sectionEls);
    sections.forEach(function(el) {
      el.innerHTML += footer;
    });

    var itemEls = document.querySelectorAll('div.slides section[data-auto-fragments="true"]:not(:first-child) li, div.slides section[data-auto-fragments="true"]:not(:first-child) p');
    var items = Array.prototype.slice.call(itemEls);
    items.forEach(function(el) {
      el.classList.add('fragment');
    });
  });

  Reveal.addEventListener('timeline', function() {
    
  }, false);

}());