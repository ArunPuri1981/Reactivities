import { Component, MouseEvent } from 'react';
import { Button, Input, Menu, MenuItem, MenuItemProps } from 'semantic-ui-react';

interface Props {
  openForm: () => void;
}

interface State {
  activeItem: string;
}

export default class MenuExamplePointing extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { activeItem: 'Activities' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (event:MouseEvent<HTMLInputElement, MouseEvent>,{name}:MenuItemProps)=> {
    if(name)
    {
      this.setState({ activeItem: name });
    }
  } 

  render() {
    const { activeItem } = this.state;
    return (
      <Menu pointing>
        <MenuItem header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivities
        </MenuItem>
        <MenuItem
          name="Activities"
          active={activeItem === 'Activities'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          name="Edit Activity"
          active={activeItem === 'Edit Activity'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          name="Delete Activity"
          active={activeItem === 'Delete Activity'}
          onClick={this.handleItemClick}
        />
        <Button onClick={this.props.openForm} positive content="Create Activity"></Button>
        <Menu.Menu position="right">
          <MenuItem>
            <Input icon="search" placeholder="Search..." />
          </MenuItem>
        </Menu.Menu>
      </Menu>
    );
  }
}
