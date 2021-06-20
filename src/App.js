import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    }
  }
  changeFirstName = (e) => {
    this.setState({firstName:e.target.value})
  }
  changeLastName = (e) => {
    this.setState({lastName:e.target.value})
  }
  changeUsername = (e) => {
    this.setState({username:e.target.value})
  }
  changeEmail = (e) => {
    this.setState({email:e.target.value})
  }
  changePassword = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault();
    const registered = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log(registered);
    axios.post('http://localhost:4000/app/register', registered)
    .then(response=>console.log(response))

    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    })
  }
  render() {
    return (
      <div>
        <div>
          <div>
            <form onSubmit={this.onSubmit}>
              <input type="text"
              placeholder="First Name"
              onChange={this.changeFirstName}
              value={this.state.firstName}
              />
              <input type="text"
              placeholder="Last Name"
              onChange={this.changeLastName}
              value={this.state.lastName}
              />
              <input type="text"
              placeholder="Username"
              onChange={this.changeUsername}
              value={this.state.username}
              />
              <input type="email"
              placeholder="Email"
              onChange={this.changeEmail}
              value={this.state.email}
              />
              <input type="password"
              placeholder="Password"
              onChange={this.changePassword}
              value={this.state.password}
              />
              <input type="submit" value='submit' />
            </form>
          </div>
        </div>
      </div>
      );
  }
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
