import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap/';
import axios from 'axios';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './AllDrinks.css';

class AllDrinks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      allDrinksArray: [],
      email: ''
    }
  }


  componentDidMount = async () => {
    const { user } = this.props.auth0;

    // let url = `http://localhost:3002/drinks`;
    // let url = `${process.env.REACT_APP_HEROKU_LINK}/drinks`;
    let url = `https://exam-practicing-401.herokuapp.com/drinks`;



    let allDrinksData = await axios.get(url);
    this.setState({
      allDrinksArray: allDrinksData.data,
      email: user.email
    })
  }




  addToFav = async (index) => {

    // let url = `http://localhost:3002/addToFav?userEmail=${this.state.email}`;
        let url = `https://exam-practicing-401.herokuapp.com/addToFav?userEmail=${this.state.email}`;

    let selected = {
      drinkName: this.state.allDrinksArray[index].strDrink,
      drinkImg: this.state.allDrinksArray[index].strDrinkThumb,
      drinkId: this.state.allDrinksArray[index].idDrink,
    }

    await axios.post(url, selected);

  }

  render() {


    return (
      // <Jumbotron>
      <div className='main'>
        <div className='text'>
          <h1>This Page For All Drinks</h1>
          <p>
            This is a collection of all Drinks
          </p>
        </div>


        <div className='drinksCards'>
          {this.state.allDrinksArray.map((drink, index) => {
            return (

              <Card className="drink" style={{ width: '18rem', backgroundColor: 'white', boxShadow: '2px 2px 2px black' }} >

                <Card.Body>
                  <Card.Title>{drink.strDrink}</Card.Title>
                  <Card.Img style={{ boxShadow: '2px 2px 2px #ccc' }} variant="top" src={drink.strDrinkThumb} alt={drink.strDrink} />

                  <Card.Text>
                    {drink.idDrink}
                  </Card.Text>

                </Card.Body>
                <Button variant="primary" onClick={() => this.addToFav(index)}>Add To Fav.</Button>
              </Card>
            )
          })}
        </div>

      </div>





      // </Jumbotron>
    )
  }
}

export default withAuth0(AllDrinks);