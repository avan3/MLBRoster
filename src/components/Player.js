import React from 'react';
import axios from 'axios';
import { Image, Segment, Dimmer, Loader, List, Container, Item, Table, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { listPlayer } from '../actions';
import './Player.css';

class Player extends React.Component {
    state = { 
        index: null,
        tableInfo: {}
    }
    getPlayer = () => {
        let selectedPlayerId = localStorage.getItem("selectedPlayer");
        return axios.get(`https://statsapi.mlb.com/api/v1/people/${selectedPlayerId}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`) 
        .then((res) => {
            this.getIndex(res.data.people[0]);
            return res.data.people[0];
        })
        .catch((err) => {
            console.log(err);
        });
    };

    aggregateData = (splits) => {
        var ab = 0, r = 0, h = 0, hr = 0, rbi = 0, sb = 0, avg = 0, obp = 0, ops = 0;
        for (let i = 0; i < splits.length; i++) {
            ab += splits[i].stat.atBats;
            r += splits[i].stat.runs;
            h += splits[i].stat.hits;
            hr += splits[i].stat.homeRuns;
            rbi += splits[i].stat.rbi;
            sb += splits[i].stat.stolenBases;
            avg += parseFloat(splits[i].stat.avg)/splits.length;
            obp += parseFloat(splits[i].stat.obp)/splits.length;
            ops += parseFloat(splits[i].stat.ops)/splits.length;
        }
        return {
            atBats: ab,
            runs: r,
            hits: h,
            homeRuns: hr,
            rbi: rbi,
            stolenBases: sb,
            avg: avg.toFixed(3).toString().replace(/^0+/, ''),
            obp: obp.toFixed(3).toString().replace(/^0+/, ''),
            ops: ops.toFixed(3).toString().replace(/^0+/, '')
        };
    };

    makeTableRow = (total) => {
        const tableRow = Object.keys(total).map((key) => {
            return (
                <Table.Cell>{total[key]}</Table.Cell>
            );
        });
        return tableRow;
    };

    getIndex = (player) => {
        for (let i = 0; i < player.stats.length; i++) {
            console.log(i);
            if (player.stats[i].group.displayName === "hitting") {
                console.log('here')
                this.setState({index: i});
            }
        }
        console.log(this.state.index)
    };

    componentDidMount() {
        this.getPlayer().then((res) => {
            this.props.listPlayer(res);
        });
    };

    componentDidUpdate() {
        // this.setState({tableInfo: this.props.player.stats[this.state.index].splits.pop()});
        console.log(this.props.player.stats);
    }

    render() {
        const { player } = this.props;
        if (Object.keys(player).length !== 0) {
            const { index, tableInfo } = this.state;
            let total = this.aggregateData(player.stats[index].splits);
            let tableRow = this.makeTableRow(total);
            return (
                <Container>
                    <Segment style={{overflow: "hidden", height: "100%"}}>
                        <Grid>
                            <Grid.Column width={7}>
                                <div>
                                    <List horizontal>
                                        <List.Item><h1 className="highlight">{player.primaryNumber}</h1></List.Item>
                                        <List.Item><h1>{player.fullName}</h1></List.Item>
                                    </List>
                                </div>
                                <Image 
                                    src={`https://securea.mlb.com/mlb/images/players/head_shot/${player.id}.jpg`}
                                    alt={player.fullName}
                                    bordered
                                    style={{
                                        float:"left",
                                        marginRight: "20px"
                                    }}
                                /> 
                                <Item>
                                    <Item.Content>
                                        <Item.Header as="h2">{player.firstName} {player.middleName} {player.lastName}</Item.Header>
                                        <Item.Description><strong>Nickname: </strong>{player.nickName}</Item.Description>
                                        <Item.Description><strong>Born: </strong>{player.birthDate}</Item.Description>
                                        <Item.Description><strong>Birth Location: </strong>{player.birthCity} {player.birthStateProvince}, {player.birthCountry}</Item.Description>
                                        <Item.Description><strong>Draft Year: </strong>{player.draftYear} </Item.Description>
                                        <Item.Description><strong>Debut: </strong>{player.mlbDebutDate} </Item.Description>

                                    </Item.Content>
                                </Item>
                            </Grid.Column>
                        
                            <Grid.Column width={9}>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Year</Table.HeaderCell>
                                            <Table.HeaderCell>AB</Table.HeaderCell>
                                            <Table.HeaderCell>R</Table.HeaderCell>
                                            <Table.HeaderCell>H</Table.HeaderCell>
                                            <Table.HeaderCell>HR</Table.HeaderCell>
                                            <Table.HeaderCell>RBI</Table.HeaderCell>
                                            <Table.HeaderCell>SB</Table.HeaderCell>
                                            <Table.HeaderCell>AVG</Table.HeaderCell>
                                            <Table.HeaderCell>OBP</Table.HeaderCell>
                                            <Table.HeaderCell>OPS</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell active>{tableInfo.season}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.atBats}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.runs}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.hits}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.homeRuns}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.rbi}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.stolenBases}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.avg}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.obp}</Table.Cell>
                                            <Table.Cell>{tableInfo.stat.ops}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                MLB Career Stats
                                            </Table.Cell>
                                            {tableRow}
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Container>                
            );
        }
        return (
            <Segment>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </Segment>
        );
    };
};

const mapStateToProps = (state) => {
    return { player: state.player };
};

export default connect(mapStateToProps, {
    listPlayer: listPlayer
}) (Player);