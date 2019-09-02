import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeActive } from '../actions';
import { Image, Button, Segment } from 'semantic-ui-react';

class Home extends React.Component {
    goToTeams = () => {
        this.props.changeActive('teams');
        this.props.history.push('/team');
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Segment style={{
                    display: "flex", 
                    alignItems: "center", 
                    height: "80vh", 
                    width: "100vw"
                }} inverted>
                    <Image 
                        className="logo"
                        src="https://cdn.bleacherreport.net/images/team_logos/328x328/mlb_rumors.png" 
                        alt="MLB Logo" 
                        size='large' 
                        centered
                    />
                    
                </Segment>
                <Button 
                    secondary
                    size='big'
                    onClick={this.goToTeams}
                    style={{ margin: "30px", padding: "20px 40px" }}
                >
                    Enter
                </Button>   
            </div>
            

        );
    };
};

const mapStateToProps = (state) => {
    return { activeItem: state.activeItem };
};

export default connect(mapStateToProps, {
    changeActive: changeActive
}) (withRouter(Home));