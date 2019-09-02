import { combineReducers } from 'redux';

const listTeamReducer = (listTeam=[], action) => {
    if (action.type === "TEAM_LIST") {
        return action.payload;
    }
    return listTeam;
}

const listRosterReducer = (roster=[], action) => {
    if (action.type === "ROSTER_LIST") {
        return action.payload;
    }
    return roster;
};

const listPlayerReducer = (player={}, action) => {
    if (action.type === "PLAYER_LIST") {
        return action.payload;
    }
    return player;
};

export default combineReducers({
    teams: listTeamReducer,
    roster: listRosterReducer,
    player: listPlayerReducer
});