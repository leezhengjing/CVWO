import React, { Component } from 'react';
import Chess from '../components/Chess';
import Wrapper from '../components/Wrapper';

class Dashboard extends Component {
    render() {
        return (
            <Wrapper>
                <Chess />
            </Wrapper>
        )
    }
}

export default Dashboard;