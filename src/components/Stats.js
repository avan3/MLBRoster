import React from 'react';
import { Table } from 'semantic-ui-react';

const Stats = (props) => {
    const { stat, position, recentYear, aggStatInfo } = props;
    if (position !== "Pitcher") {
        return (
            <Table celled unstackable>
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
                        <Table.Cell active>{recentYear}</Table.Cell>
                        <Table.Cell>{stat.atBats}</Table.Cell>
                        <Table.Cell>{stat.runs}</Table.Cell>
                        <Table.Cell>{stat.hits}</Table.Cell>
                        <Table.Cell>{stat.homeRuns}</Table.Cell>
                        <Table.Cell>{stat.rbi}</Table.Cell>
                        <Table.Cell>{stat.stolenBases}</Table.Cell>
                        <Table.Cell>{stat.avg}</Table.Cell>
                        <Table.Cell>{stat.obp}</Table.Cell>
                        <Table.Cell>{stat.ops}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>MLB Career Stats</Table.Cell>
                        <Table.Cell>{aggStatInfo.atBats}</Table.Cell>
                        <Table.Cell>{aggStatInfo.runs}</Table.Cell>
                        <Table.Cell>{aggStatInfo.hits}</Table.Cell>
                        <Table.Cell>{aggStatInfo.homeRuns}</Table.Cell>
                        <Table.Cell>{aggStatInfo.rbi}</Table.Cell>
                        <Table.Cell>{aggStatInfo.stolenBases}</Table.Cell>
                        <Table.Cell>{aggStatInfo.avg}</Table.Cell>
                        <Table.Cell>{aggStatInfo.obp}</Table.Cell>
                        <Table.Cell>{aggStatInfo.ops}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    } 
    else {
        return (
            <Table celled unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.HeaderCell>W</Table.HeaderCell>
                        <Table.HeaderCell>L</Table.HeaderCell>
                        <Table.HeaderCell>ERA</Table.HeaderCell>
                        <Table.HeaderCell>G</Table.HeaderCell>
                        <Table.HeaderCell>GS</Table.HeaderCell>
                        <Table.HeaderCell>SV</Table.HeaderCell>
                        <Table.HeaderCell>IP</Table.HeaderCell>
                        <Table.HeaderCell>SO</Table.HeaderCell>
                        <Table.HeaderCell>WHIP</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell active>{recentYear}</Table.Cell>
                        <Table.Cell>{stat.wins}</Table.Cell>
                        <Table.Cell>{stat.losses}</Table.Cell>
                        <Table.Cell>{stat.era}</Table.Cell>
                        <Table.Cell>{stat.gamesPlayed}</Table.Cell>
                        <Table.Cell>{stat.gamesStarted}</Table.Cell>
                        <Table.Cell>{stat.saves}</Table.Cell>
                        <Table.Cell>{stat.inningsPitched}</Table.Cell>
                        <Table.Cell>{stat.strikeOuts}</Table.Cell>
                        <Table.Cell>{stat.whip}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell active>MLB Career Stats</Table.Cell>
                        <Table.Cell>{aggStatInfo.wins}</Table.Cell>
                        <Table.Cell>{aggStatInfo.losses}</Table.Cell>
                        <Table.Cell>{aggStatInfo.era}</Table.Cell>
                        <Table.Cell>{aggStatInfo.gamesPlayed}</Table.Cell>
                        <Table.Cell>{aggStatInfo.gamesStarted}</Table.Cell>
                        <Table.Cell>{aggStatInfo.saves}</Table.Cell>
                        <Table.Cell>{aggStatInfo.inningsPitched}</Table.Cell>
                        <Table.Cell>{aggStatInfo.strikeOuts}</Table.Cell>
                        <Table.Cell>{aggStatInfo.whip}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    };
};

export default Stats;