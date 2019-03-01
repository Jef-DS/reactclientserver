import React, { Component } from 'React';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
const CursistLijst = (props) => {
    console.log(props.items);
    return (
        <ul>
            {props.items.map((item, index) => (
                <li key={index}>{item.naam}</li>
            ))}
        </ul>
    );
}
class CursistForm extends Component {
    constructor(props) {
        super(props);
        this.state = { naam: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ naam: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state.naam);
    }
    render() {
        return (
            <Col md="12">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label for="naam" md="2">Naam</Label>
                        <Col md="10">
                            <Input type="text" id="naam" name="naam" value={this.state.naam} onChange={this.handleChange} />
                        </Col>
                    </FormGroup>
                    <Button color="primary">Verzenden</Button>
                </Form>
            </Col>)
    }
}
class CursistLijstContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            error: null
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    async componentDidMount() {
        try {
            const response = await fetch('api/cursisten');
            const json = await response.json();
            this.setState({ items: json });
        } catch (err) {
            this.setState({ error: err.toString() });
            console.log(err.toString());
        }
    }
    async handleFormSubmit(value) {
        const sendPost = await fetch('api/cursisten', {
            method: 'POST',
            body: JSON.stringify({
                naam: value
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
        const resultPost = await sendPost.json();
        await this.componentDidMount();
    }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <CursistForm handleSubmit={this.handleFormSubmit}></CursistForm>
                </Row>
                <Row>
                    <CursistLijst items={this.state.items} />
                </Row>
            </React.Fragment>
        );
    }
}

export default CursistLijstContainer;