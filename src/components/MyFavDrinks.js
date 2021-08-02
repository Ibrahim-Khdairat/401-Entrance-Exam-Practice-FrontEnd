import axios from 'axios';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap/';
import './MyFavDrinks.css'
import UpdateForm from './buttons/UpdateForm';


class MyFavDrinks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myFavDrink: [],
            email: '',
            show: false,
            updateObject: {}
        }
    }

    componentDidMount = async () => {
        const { user, isAuthenticated } = this.props.auth0;

        if (isAuthenticated) {
            // let url = `http://localhost:3002/userDrinks/${user.email}`;
            let url = `https://exam-practicing-401.herokuapp.com/userDrinks/${user.email}`;

            let favDrinks = await axios.get(url);
            this.setState({
                myFavDrink: favDrinks.data,
                email: user.email
            })
        }

    }

    delete = async (index) => {
        // let url = `http://localhost:3002/deleteDrink/${this.state.email}?index=${index}`;
        let url = `https://exam-practicing-401.herokuapp.com/deleteDrink/${this.state.email}?index=${index}`;

      
        let favDrinks = await axios.delete(url);
        this.setState({
            myFavDrink: favDrinks.data
        })

    }


    showForm = (index) => {
        let selectedObject = {
            drinkName: this.state.myFavDrink[index].drinkName,
            drinkImg: this.state.myFavDrink[index].drinkImg,
            drinkId: this.state.myFavDrink[index].drinkId,

        }
        this.setState({
            show: true,
            index: index,
            updateObject: selectedObject
        })
    }

    onClose = () => {
        this.setState({
            show: false,
        })
    }
    handleUpdate = async(event) => {
        event.preventDefault();
        this.setState({
            show: false,
        })

        let updatedObj = {
            drinkName: event.target.name.value,
            drinkImg: event.target.img.value,
            drinkId: event.target.id.value
        }

        // let url = `http://localhost:3002/updateDrink/${this.state.email}?index=${this.state.index}`;
        
        let url = `https://exam-practicing-401.herokuapp.com/updateDrink/${this.state.email}?index=${this.state.index}`;

        let updated = await axios.put(url , updatedObj)
        this.setState({
            myFavDrink: updated.data,
        })
    }

    render() {
        const { user, isAuthenticated } = this.props.auth0;

        return (
            <>
                <UpdateForm show={this.state.show} onClose={this.onClose} handleUpdate={this.handleUpdate} updateObject = {this.state.updateObject}/>


                {isAuthenticated &&
                    <div>
                        <h1>This Page for {user.name} Fav. Drinks</h1>
                        <div className='favdrinks'>
                            {this.state.myFavDrink.map((drink, index) => {

                                return (

                                    <Card className="drink" style={{ width: '18rem', backgroundColor: 'white', boxShadow: '2px 2px 2px black' }} >

                                        <Card.Body>
                                            <Card.Title>{drink.drinkName}</Card.Title>
                                            <Card.Img style={{ boxShadow: '2px 2px 2px #ccc' }} variant="top" src={drink.drinkImg} alt={drink.drinkName} />

                                            <Card.Text>
                                                {drink.drinkId}
                                            </Card.Text>

                                        </Card.Body>
                                        <Button variant="warning" onClick={() => { this.showForm(index) }} >Update</Button>
                                        <Button variant="danger" onClick={() => { this.delete(index) }}>Delete</Button>

                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                }



            </>
        )
    }
}

export default withAuth0(MyFavDrinks)
