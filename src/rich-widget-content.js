import React from 'react';
import ReactDOM from 'react-dom';
import Postmate from 'postmate';
import 'antd/dist/antd.css';
import './styles/rich-widget-content.scss';
import DrawerContent from './inc/DrawerContent';

const $root = document.getElementById('root');

window.ParentFrame = new Postmate.Model({
  height: () => {
    return $root.offsetHeight;
  },
  width: () => {
    return $root.offsetWidth;
  },
});

ReactDOM.render(
  <div className="app">
    <DrawerContent />
  </div>,
  $root,
  () => {
    window.ParentFrame.then(parent => {
      parent.emit('ready');
    });
  },
);
