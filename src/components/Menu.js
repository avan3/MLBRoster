import React from 'react';
import { Menu, Segment, Input, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Menu.css';

class MLBMenu extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
      const { activeItem } = this.state
  
        return (
            <Segment inverted className="headerMenu">
                <Menu size="large" inverted pointing secondary stackable>
                    <Menu.Item>
                        <Image 
                            className="logo"
                            src="https://cdn.bleacherreport.net/images/team_logos/328x328/mlb_rumors.png" 
                            alt="MLB Logo" 
                        />
                    </Menu.Item>
                    <Menu.Item as={Link} to="/"
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/team"
                        name='teams'
                        active={activeItem === 'teams'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/roster"
                        name='roster'
                        active={activeItem === 'roster'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/player"
                        name='players'
                        active={activeItem === 'players'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    };
};

export default MLBMenu;