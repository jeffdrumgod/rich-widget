import Postmate from 'postmate';
import './styles/rich-widget.scss';

document.addEventListener('DOMContentLoaded', function(event) {
  try {
    Postmate.debug = true;
    const handshake = new Postmate({
      container: document.getElementById('trivod-rich-widget'), // Element to inject frame into
      url: './iframe.html', // Page to load, must have postmate.js. This will also be the origin used for communication.
      name: 'trivod-rich-widget', // Set Iframe name attribute. Useful to get `window.name` in the child.
    });

    handshake.then(child => {
      const defaultSize = () => {
        child.get('height').then(height => {
          if (isNaN(height)) {
            return (child.frame.style.height = height);
          }
          return (child.frame.style.height = `${height}px`);
        });
        child.get('width').then(width => {
          if (isNaN(width)) {
            return (child.frame.style.width = width);
          }
          return (child.frame.style.width = `${width}px`);
        });
      };

      defaultSize();

      child.on('ready', () => {
        console.log('✅ Dom ready in iframe');
      });
      child.on('showDrawer', data => {
        child.frame.classList.add('fullSize');
      });
      child.on('hideDrawer', data => {
        child.frame.classList.remove('fullSize');
      });
    });
  } catch (e) {
    console.error(e);
  }
});
