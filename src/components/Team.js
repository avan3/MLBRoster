import React from 'react';
import axios from 'axios';
import { listTeams, changeActive } from '../actions';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import MLBMenu from './Menu';

class Team extends React.Component {
    getTeams = () => {
        return axios.get('https://statsapi.mlb.com/api/v1/teams?sportId=1')
        .then((res) => {
            return res.data.teams.sort((a,b) => a.name.localeCompare(b.name));
        })
        .catch((err) => {
            console.log(err);
        })
    };

    goToRosterDetails = (teamId) => {
        localStorage.setItem("selectedTeam", teamId);
        this.props.changeActive('roster');
        this.props.history.push('/roster');
    };

    componentDidMount() {
        this.getTeams().then((res) => {
            this.props.listTeams(res);
        })
    };

    componentDidUpdate() {
        window.onpopstate = (e) => {
            this.props.changeActive('home');
            this.props.history.push('/');
        };
    };

    render() {
        const team = this.props.teams.map((item) => {
            return (
                <Card 
                    key={item.id} 
                    style={{width: "auto", height: "auto"}}
                    onClick = {() => this.goToRosterDetails(item.id)}
                >
                    <Image 
                        src={`https://www.mlbstatic.com/team-logos/${item.id}.svg`} 
                        alt={item.name} 
                        style={{
                            height: "200px",
                            width: "195px",
                            padding: "5px"
                        }}
                    />
                    <Card.Content>
                        <Card.Header style={{fontSize: "16px"}}>
                            {item.name}
                        </Card.Header>
                    </Card.Content>
                </Card>

            );
        });
        return (
            <div>
                <MLBMenu/>
                <Card.Group centered>
                {team} 
                </Card.Group>
            </div>

        );
    };
};

const mapStateToProps = (state) => {
    return { teams: state.teams}
}

export default connect(mapStateToProps, {
    listTeams: listTeams,
    changeActive: changeActive
}) (withRouter(Team));