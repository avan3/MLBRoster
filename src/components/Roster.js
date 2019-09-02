import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { listRoster } from '../actions';
import { Table, Image, Container } from 'semantic-ui-react'; 
import './Roster.css';

class Roster extends React.Component {
    getRoster = () => {
        let selectedTeamId = localStorage.getItem("selectedTeam");
        return axios.get(`https://statsapi.mlb.com/api/v1/teams/${selectedTeamId}/roster/Active?hydrate=person(stats(type=season))`) 
        .then((res) => {
            return res.data.roster;
        })
        .catch((err) => {
            console.log(err);
        });
    };

    goToPlayerDetails = (playerId) => {
        localStorage.setItem("selectedPlayer", playerId);
        this.props.history.push('/player');
    };

    componentDidMount() {
        this.getRoster().then((res) => {
            this.props.listRoster(res);
        });
    };

    render() {
        // TODO: group positions by pitcher, catchers, infield, outfield 
        const players = this.props.roster.map(({ person }) => {
            return (
                <Table.Row key={person.id} onClick = {() => this.goToPlayerDetails(person.id)}>
                    <Table.Cell collapsing>{person.primaryNumber}</Table.Cell>
                    <Table.Cell collapsing>
                        <Image 
                            verticalAlign='middle'
                            src={`https://securea.mlb.com/mlb/images/players/head_shot/${person.id}.jpg`}
                            alt={person.fullName}
                            style={{width: "50px", paddingRight: "10px"}}
                        />
                        <span>{person.fullName}</span>
                    </Table.Cell>
                    <Table.Cell collapsing>{person.batSide.code}/{person.pitchHand.code}</Table.Cell>
                    <Table.Cell collapsing>{person.height}</Table.Cell>
                    <Table.Cell collapsing>{person.weight}lbs</Table.Cell>
                    <Table.Cell collapsing>{person.birthDate}</Table.Cell>
                </Table.Row>
            );
        });
        return (
            <Container>
                <Table celled inverted striped unstackable selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={6}>Active Players</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>#</Table.Cell>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>B/T</Table.Cell>
                            <Table.Cell>Ht</Table.Cell>
                            <Table.Cell>Wt</Table.Cell>
                            <Table.Cell>DOB</Table.Cell>
                        </Table.Row>
                        {players}
                    </Table.Body>
                </Table>
            </Container>
            
        );
    };
};

const mapStateToProps = (state) => {
    return { roster: state.roster };
};

export default connect(mapStateToProps, {
    listRoster: listRoster
}) (withRouter(Roster));