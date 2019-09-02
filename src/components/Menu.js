import React from 'react';
import { Menu, Segment, Input, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeActive } from '../actions';
import './Menu.css';

class MLBMenu extends React.Component {

    handleItemClick = (e, { name }) => this.props.changeActive(name);

    render() {
        const { activeItem, roster, player } = this.props;
        return (
            <Segment inverted className="headerMenu">
                <Menu size="large" inverted pointing secondary stackable>
                    <Menu.Item
                        as={Link} to="/"
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        <Image 
                            className="logo"
                            src="https://cdn.bleacherreport.net/images/team_logos/328x328/mlb_rumors.png" 
                            alt="MLB Logo" 
                        />
                    </Menu.Item>
                    <Menu.Item as={Link} to="/team"
                        name='teams'
                        active={activeItem === 'teams'}
                        onClick={this.handleItemClick}
                    />
                    {roster.length !== 0 ? (
                        <Menu.Item as={Link} to="/roster"
                            name='roster'
                            active={activeItem === 'roster'}
                            onClick={this.handleItemClick}
                        /> 
                    ) : null }
                    {Object.keys(player).length !== 0 ? (
                        <Menu.Item as={Link} to="/player"
                            name='players'
                            active={activeItem === 'players'}
                            onClick={this.handleItemClick}
                        />
                    ) : null }
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

const mapStateToProps = (state) => {
    return { 
        roster: state.roster,
        player: state.player, 
        activeItem: state.activeItem 
    };
};

export default connect(mapStateToProps, {
    changeActive: changeActive
}) (withRouter(MLBMenu));