import React, { Component } from 'react';
import { Button, Tab, Table } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        console.log(campaign);
        const requestCount = parseInt(await campaign.methods.getRequestsCount().call());
        
        const requests = await Promise.all(
            Array(requestCount).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        const approversCount = await campaign.methods.approversCount().call();

        console.log(requests);

        return { address, requests, requestCount, approversCount };
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                        request={request}
                        key={index}
                        id={index}
                        address={this.props.address}
                        approversCount={this.props.approversCount}
                    />;
        });
    }

    render(){

        const { Header, Row, HeaderCell, Body } = Table;



        return(
            <Layout>
                <h3>Yêu cầu</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom:10}}>Thêm yêu cầu</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Mã</HeaderCell>
                            <HeaderCell>Miêu tả</HeaderCell>
                            <HeaderCell>Số lượng</HeaderCell>
                            <HeaderCell>Người nhận</HeaderCell>
                            <HeaderCell>Số lần phê duyệt</HeaderCell>
                            <HeaderCell>Chấp thuận</HeaderCell>
                            <HeaderCell>Hoàn thiện</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>

                </Table>

                <div>
                    Đã tìm thấy {this.props.requestCount} yêu cầu.
                </div>

            </Layout>
        );
    }
}

export default RequestIndex;