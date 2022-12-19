import React, { Component } from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react';
import { Link } from '../routes';
class Header extends Component {

    render(){
        return (
            <Menu style={{ marginTop: '10px' }}>

                <Link route="/">
                    
                    <a className="item"><Icon name="ethereum" size="large"/>CrowdFund App</a>
                </Link>

                <Menu.Menu position="right">
                    <Link route="/">
                        <a className="item">Chiến dịch</a>
                    </Link>
                        <a className="item" href="https://github.com/HoangThong37"><Icon name="github" size="large"/></a>
                    <Link route="/campaigns/new">
                        <a className="item"><Icon name="add"/></a>
                    </Link>
                </Menu.Menu>

            </Menu>
        );
    };
}

export default Header;

// import React from 'react';
// import { Menu } from 'semantic-ui-react';
// import { Link } from '../routes';

// const Header = () => {
//     return (
//         <Menu style={{ marginTop: '10px'}}>
//             <Link route="/"><a className="item"><img src="/crowdfund.png"/>&nbsp;Crowdfunding App</a></Link>
//             <Menu.Menu position="right">
//             <Link route="/"><a className="item">Campaigns</a></Link>
//             <Link route="/campaigns/new"><a className="item">+</a></Link>
//             </Menu.Menu>
//         </Menu>
//     );
// }

// export default Header;