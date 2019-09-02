export const listTeams = (teams) => {
    return {
        type: "TEAM_LIST",
        payload: teams
    };
};

export const listRoster = (roster) => {
    return {
        type: "ROSTER_LIST",
        payload: roster
    };
};

export const listPlayer = (player) => {
    return {
        type: "PLAYER_LIST",
        payload: player
    };
};

export const changeActive = (item) => {
    return {
        type: "CHANGE_ACTIVE",
        payload: item
    };
}; 