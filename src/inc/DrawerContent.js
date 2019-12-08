import React from 'react';
import { Drawer, Button, Icon, Tooltip } from 'antd';

class DrawerContent extends React.Component {
  state = { visible: false, iconVisible: true };

  showDrawer = () => {
    window.ParentFrame.then(parent => {
      parent.emit('showDrawer');
    });
    this.setState({
      visible: true,
      iconVisible: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      window.ParentFrame.then(parent => {
        parent.emit('hideDrawer');
        this.setState({
          iconVisible: true,
        });
      });
    }, 300);
  };

  render() {
    return (
      <>
        <a
          role="link"
          onClick={this.showDrawer}
          onKeyPress={this.showDrawer}
          className={`${this.state.iconVisible ? 'visible' : ''} activation-link`}
        >
          <Icon type="appstore" theme="twoTone" />
        </a>
        <Drawer
          title="Ferramentas"
          placement="right"
          closable={false}
          width={320}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae iusto doloremque expedita
            sed minus, delectus tempora ut fugiat incidunt culpa. Vitae doloribus facilis
            architecto, quam tempora error accusamus alias iste.
          </p>
          <a className="by" href="https://jeffdrumgod.com.br/" target="_blank">
            By jeff_drumgod
          </a>
        </Drawer>
      </>
    );
  }
}

export default DrawerContent;
