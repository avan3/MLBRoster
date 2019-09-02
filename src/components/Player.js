import React from 'react';
import axios from 'axios';
import { Image, Segment, List, Item, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { listPlayer } from '../actions';
import Stats from './Stats';
import CareerStats from './CareerStats';
import MLBMenu from './Menu';

import './Player.css';

class Player extends React.Component {
    state = {
        player: {},
        position: '',
        splits: [],
        stat: {}, 
        recentYear: 0,
        aggStatInfo: {}
    }
    componentDidMount() {
        let selectedPlayerId = localStorage.getItem("selectedPlayer");
        axios.get(`https://statsapi.mlb.com/api/v1/people/${selectedPlayerId}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`) 
        .then((res) => {
            this.props.listPlayer(res.data.people[0]);
            return res.data.people[0];
        })
        .then((player) => {
            this.setState({position: player.primaryPosition.name});
            return this.getRecentSplit(player);
        })
        .then((splits) => {
            this.setState({splits: splits});
            this.setState({stat: splits[splits.length - 1].stat});
            this.setState({recentYear: splits[splits.length - 1].season});
            return this.aggregateData(splits);
        })
        .then((aggInfo) => {
            this.setState({aggStatInfo: aggInfo});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    aggregateData = (splits) => {
        let position = this.props.player.primaryPosition.name;
        if (position === "Pitcher") {
            let wins = 0, losses = 0, era = 0, gamesPlayed = 0, gamesStarted = 0, saves = 0, inningsPitched = 0, strikeOuts = 0, whip = 0;
            for (let i = 0; i < splits.length; i++) {
                wins += splits[i].stat.wins;
                losses += splits[i].stat.losses;
                era += splits[i].stat.era/splits.length;
                gamesPlayed += splits[i].stat.gamesPlayed;
                gamesStarted += splits[i].stat.gamesStarted;
                saves += splits[i].stat.saves;
                inningsPitched += parseFloat(splits[i].stat.inningsPitched);
                strikeOuts += splits[i].stat.strikeOuts;
                whip += parseFloat(splits[i].stat.whip)/splits.length;
            }
            return {
                wins: wins,
                losses: losses,
                era: era.toFixed(2),
                gamesPlayed: gamesPlayed,
                gamesStarted: gamesStarted,
                saves: saves,
                inningsPitched: inningsPitched.toFixed(1),
                strikeOuts: strikeOuts,
                whip: whip.toFixed(2)
            };
        }
        else {
            let ab = 0, r = 0, h = 0, hr = 0, rbi = 0, sb = 0, avg = 0, obp = 0, ops = 0;
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
        }
    };

    getRecentSplit = (player) => {
        let index = 0;
        for (let i = 0; i < player.stats.length; i++) {
            if (player.primaryPosition.name !== "Pitcher" && player.stats[i].group.displayName === "hitting") {
                index = i;
            }
            else if (player.primaryPosition.name === "Pitcher" && player.stats[i].group.displayName === "pitching") {
                index = i;
            }
        }
        return player.stats[index].splits;
    };

    render() {
        const { stat, recentYear, aggStatInfo, position } = this.state;
        const { player } = this.props;
        return (
            <div>
                <MLBMenu/>
                <Segment style={{height: "100%"}}>
                    <Grid>
                        <Grid.Column width={11}>
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
                                    marginRight: "30px",
                                    marginBottom: "30px"
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
                            <Stats 
                                position={position} 
                                stat={stat} 
                                recentYear={recentYear} 
                                aggStatInfo={aggStatInfo}
                            />
                        </Grid.Column>
                    </Grid>
                    <CareerStats splits={this.state.splits} position={position}/>
                </Segment>
            </div>            
        );
    };
};

const mapStateToProps = (state) => {
    return { player: state.player };
};

export default connect(mapStateToProps, {
    listPlayer: listPlayer
}) (Player);