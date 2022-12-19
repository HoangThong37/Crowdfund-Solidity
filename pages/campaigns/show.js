import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from "../../components/layout";
import Campaign from '../../ethereum/campaign';  
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return { 
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
         };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
               // description: 'The manager created this campaign and can create requests to withdraw money',
               description: 'Người quản lý tạo chiến dịch này và có thể tạo yêu cầu rút tiền',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(`${balance}`, 'ether'),
                meta: 'Campaign Balance (Ether)',
              //  description: 'How much money this campaign has left to spend',
               description: 'Số tiền mà chiến dịch này còn lại để chi tiêu',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Wei',
               // description: 'You must contribute atleast minimum amount to become an approver',
               description: 'Bạn phải đóng góp ít nhất số tiền tối thiểu để trở thành người phê duyệt',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Requests',
               // description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
               description: 'Một yêu cầu rút tiền từ hợp đồng. Yêu cầu phải được phê duyệt bởi người phê duyệt',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                // description: 'People who have already contributed to the campaign',
                description: 'Những người đã đóng góp cho chiến dịch',
                style: { overflowWrap: 'break-word'}
            },
        ];

        return <Card.Group items={items}></Card.Group>
    }

    render(){
        return (
            <Layout>
                <h3>Hiển thị chiến dịch</h3>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <div>
                            { this.renderCards() }
                            </div>
                            
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                            <Grid.Column>
                                <Link route={`/campaigns/${this.props.address}/requests`}>
                                    <a>
                                        <Button primary>Xem yêu cầu</Button>
                                    </a>
                                </Link>
                            </Grid.Column>
                    </Grid.Row>

                </Grid>
                
                
            </Layout>
        );
    }
}

export default CampaignShow;