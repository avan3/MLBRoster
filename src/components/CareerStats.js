import React from 'react';
import { Table, Segment } from 'semantic-ui-react';

class CareerStats extends React.Component {
    makeHeaderRow = () => {
        if (this.props.position !== "Pitcher") {
            return (
                <Table.Row>
                    <Table.HeaderCell>Season</Table.HeaderCell>
                    <Table.HeaderCell>Team</Table.HeaderCell>
                    <Table.HeaderCell>League</Table.HeaderCell>
                    <Table.HeaderCell>G</Table.HeaderCell>
                    <Table.HeaderCell>AB</Table.HeaderCell>
                    <Table.HeaderCell>R</Table.HeaderCell>
                    <Table.HeaderCell>H</Table.HeaderCell>
                    <Table.HeaderCell>TB</Table.HeaderCell>
                    <Table.HeaderCell>2B</Table.HeaderCell>
                    <Table.HeaderCell>3B</Table.HeaderCell>
                    <Table.HeaderCell>HR</Table.HeaderCell>
                    <Table.HeaderCell>RBI</Table.HeaderCell>
                    <Table.HeaderCell>BB</Table.HeaderCell>
                    <Table.HeaderCell>IBB</Table.HeaderCell>
                    <Table.HeaderCell>SO</Table.HeaderCell>
                    <Table.HeaderCell>SB</Table.HeaderCell>
                    <Table.HeaderCell>CS</Table.HeaderCell>
                    <Table.HeaderCell>AVG</Table.HeaderCell>
                    <Table.HeaderCell>OBP</Table.HeaderCell>
                    <Table.HeaderCell>SLG</Table.HeaderCell>
                    <Table.HeaderCell>OPS</Table.HeaderCell>
                    <Table.HeaderCell>GO/AO</Table.HeaderCell>
                </Table.Row>
            );
        }
        else {
            return (
                <Table.Row>
                    <Table.HeaderCell>Season</Table.HeaderCell>
                    <Table.HeaderCell>Team</Table.HeaderCell>
                    <Table.HeaderCell>League</Table.HeaderCell>
                    <Table.HeaderCell>W</Table.HeaderCell>
                    <Table.HeaderCell>L</Table.HeaderCell>
                    <Table.HeaderCell>ERA</Table.HeaderCell>
                    <Table.HeaderCell>G</Table.HeaderCell>
                    <Table.HeaderCell>GS</Table.HeaderCell>
                    <Table.HeaderCell>CG</Table.HeaderCell>
                    <Table.HeaderCell>SHO</Table.HeaderCell>
                    <Table.HeaderCell>HLD</Table.HeaderCell>
                    <Table.HeaderCell>SV</Table.HeaderCell>
                    <Table.HeaderCell>SVO</Table.HeaderCell>
                    <Table.HeaderCell>IP</Table.HeaderCell>
                    <Table.HeaderCell>H</Table.HeaderCell>
                    <Table.HeaderCell>R</Table.HeaderCell>
                    <Table.HeaderCell>ER</Table.HeaderCell>
                    <Table.HeaderCell>HR</Table.HeaderCell>
                    <Table.HeaderCell>NP</Table.HeaderCell>
                    <Table.HeaderCell>HB</Table.HeaderCell>
                    <Table.HeaderCell>BB</Table.HeaderCell>
                    <Table.HeaderCell>IBB</Table.HeaderCell>
                    <Table.HeaderCell>SO</Table.HeaderCell>
                    <Table.HeaderCell>AVG</Table.HeaderCell>
                    <Table.HeaderCell>WHIP</Table.HeaderCell>
                    <Table.HeaderCell>GO/AO</Table.HeaderCell>
                </Table.Row>
            );
        };
    };
    
    makeTableRow = (splits) => {
        if (this.props.position !== "Pitcher") {
            const tableRow = splits.map((obj) => {
                let key = obj.hasOwnProperty('team') ? obj.season + obj.team.name : obj.season;
                let teamName = obj.hasOwnProperty('team') ? obj.team.name : 'Multiple teams';
                let league = obj.hasOwnProperty('league') ? obj.league.name : '-';
                return (
                    <Table.Row key={key}>
                        <Table.HeaderCell active>{obj.season}</Table.HeaderCell>
                        <Table.Cell>{teamName}</Table.Cell>
                        <Table.Cell>{league}</Table.Cell>
                        <Table.Cell>{obj.stat.gamesPlayed}</Table.Cell>
                        <Table.Cell>{obj.stat.atBats}</Table.Cell>
                        <Table.Cell>{obj.stat.runs}</Table.Cell>
                        <Table.Cell>{obj.stat.hits}</Table.Cell>
                        <Table.Cell>{obj.stat.totalBases}</Table.Cell>
                        <Table.Cell>{obj.stat.doubles}</Table.Cell>
                        <Table.Cell>{obj.stat.triples}</Table.Cell>
                        <Table.Cell>{obj.stat.homeRuns}</Table.Cell>
                        <Table.Cell>{obj.stat.rbi}</Table.Cell>
                        <Table.Cell>{obj.stat.baseOnBalls}</Table.Cell>
                        <Table.Cell>{obj.stat.intentionalWalks}</Table.Cell>
                        <Table.Cell>{obj.stat.strikeOuts}</Table.Cell>
                        <Table.Cell>{obj.stat.stolenBases}</Table.Cell>
                        <Table.Cell>{obj.stat.caughtStealing}</Table.Cell>
                        <Table.Cell>{obj.stat.avg}</Table.Cell>
                        <Table.Cell>{obj.stat.obp}</Table.Cell>
                        <Table.Cell>{obj.stat.slg}</Table.Cell>
                        <Table.Cell>{obj.stat.ops}</Table.Cell>
                        <Table.Cell>{obj.stat.groundOutsToAirouts}</Table.Cell>
                    </Table.Row>
                );
            });
            return tableRow;
        }
        else {
            const tableRow = splits.map((obj) => {
                let key = obj.hasOwnProperty('team') ? obj.season + obj.team.name : obj.season;
                let teamName = obj.hasOwnProperty('team') ? obj.team.name : 'Multiple teams';
                let league = obj.hasOwnProperty('league') ? obj.league.name : '-';
                return (
                    <Table.Row key={key}>
                        <Table.HeaderCell active>{obj.season}</Table.HeaderCell>
                        <Table.Cell>{teamName}</Table.Cell>
                        <Table.Cell>{league}</Table.Cell>
                        <Table.Cell>{obj.stat.wins}</Table.Cell>
                        <Table.Cell>{obj.stat.losses}</Table.Cell>
                        <Table.Cell>{obj.stat.era}</Table.Cell>
                        <Table.Cell>{obj.stat.gamesPlayed}</Table.Cell>
                        <Table.Cell>{obj.stat.gamesStarted}</Table.Cell>
                        <Table.Cell>{obj.stat.completeGames}</Table.Cell>
                        <Table.Cell>{obj.stat.shutouts}</Table.Cell>
                        <Table.Cell>{obj.stat.holds}</Table.Cell>
                        <Table.Cell>{obj.stat.saves}</Table.Cell>
                        <Table.Cell>{obj.stat.saveOpportunities}</Table.Cell>
                        <Table.Cell>{obj.stat.inningsPitched}</Table.Cell>
                        <Table.Cell>{obj.stat.hits}</Table.Cell>
                        <Table.Cell>{obj.stat.runs}</Table.Cell>
                        <Table.Cell>{obj.stat.earnedRuns}</Table.Cell>
                        <Table.Cell>{obj.stat.homeRuns}</Table.Cell>
                        <Table.Cell>{obj.stat.numberOfPitches}</Table.Cell>
                        <Table.Cell>{obj.stat.hitBatsmen}</Table.Cell>
                        <Table.Cell>{obj.stat.baseOnBalls}</Table.Cell>
                        <Table.Cell>{obj.stat.intentionalWalks}</Table.Cell>
                        <Table.Cell>{obj.stat.strikeOuts}</Table.Cell>
                        <Table.Cell>{obj.stat.avg}</Table.Cell>
                        <Table.Cell>{obj.stat.whip}</Table.Cell>
                        <Table.Cell>{obj.stat.groundOutsToAirouts}</Table.Cell>
                    </Table.Row>
                );
            });
            return tableRow;
        }
    };

    render() {
        return (
            <Segment style={{overflowX: "scroll"}}>
                <h2 style={{padding: "5px"}}>Career Stats</h2>
                <Table celled unstackable>
                    <Table.Header>
                        {this.makeHeaderRow()}
                    </Table.Header>
                    <Table.Body>
                        {this.makeTableRow(this.props.splits)}
                    </Table.Body>
                </Table>
            </Segment>

        )
    };
};

export default CareerStats;