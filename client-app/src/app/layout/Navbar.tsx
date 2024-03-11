import React,{ Component } from 'react';
import { Button, Container, Input, Menu, MenuItem, MenuMenu } from 'semantic-ui-react';


export default class MenuExamplePointing extends Component {
     state = { activeItem: 'Activities' }

     //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
        
     
     render(){
        const { activeItem } = this.state
        return(
        <Menu pointing>
          <Menu.Item header>
            <img src='/assets/logo.png' alt='logo' style={{marginRight:'10px'}}/>
            Reactivities 
          </Menu.Item>
          <MenuItem
            name='Activities'
            active={activeItem === 'Activities'}
            //onClick={this.handleItemClick}
          />
          <MenuItem
            name='Edit Activity'
            active={activeItem === 'Edit Activity'}
            //onClick={this.handleItemClick}
          />
          <MenuItem
            name='Delete Activity'
            active={activeItem === 'Delete Activity'}
            //onClick={this.handleItemClick}
          />
          <MenuItem>
          <Button positive content="Create Activity"></Button>
          </MenuItem>
          <MenuMenu position='right'>
            <MenuItem>
              <Input icon='search' placeholder='Search...' />
            </MenuItem>
          </MenuMenu>
        </Menu>
    )
}
}