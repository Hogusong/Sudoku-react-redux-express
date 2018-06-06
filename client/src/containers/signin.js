import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', email: '', password: '', confirm: '',  result: ''
    }
    this.accessSignIn = this.accessSignIn.bind(this);
  }

  closeSignIn() {
    document.getElementById('modal-start').style.display='none';
  }

  accessSignIn() {
    const username = this.state.username.trim();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const confirm = this.state.confirm.trim();
    if (username.length < 4) return alert("Username is not valid.");
    if (email.indexOf('@') < 3) return alert("Email address is not valid.");
    if (password.length < 6) return alert("Password is not valid.") ;
    if (password !== confirm) return alert("Password and Confirm are not matched.");

    this.props.createUser({ username, email, password });

    this.setState({ username, email, password, confirm, result: 'pass' })
    document.getElementById('modal-start').style.display='none';
  }

  componentDidUpdate() {
    if (this.state.result === "pass") {
      this.setState({ username:'', email:'', password:'', confirm:'', result: '' })
    }
  }

  render() {
    return (
      <div id="modal-start" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span onClick={this.closeSignIn}>
                &times;</span>
            <h3>Sign in Info.</h3>
          </div>
          <div className="modal-info">
            <label className="modal-label">User Name</label>
            <input className="modal-input" type="text" placeholder="Enter username( 4 and more )" id="username"
                    value={this.state.username} autoFocus={true}
                    onChange={(e) => this.setState({ username: e.target.value })} />

            <label className="modal-label">Email</label>
            <input className="modal-input" type="Email" placeholder="Enter Email" id="email" 
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })} />           

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" placeholder="Enter Password( 6 and more )" 
                    id="password" value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })} />  

            <label className="modal-label">Confirm password</label>
            <input className="modal-input" type="password" placeholder="Enter Password again( 6 and more )"
                    id="confirm" value={this.state.confirm}
                    onChange={(e) => this.setState({ confirm: e.target.value })} />  
            <button onClick={() => this.accessSignIn()} className="modal-btn">Submit</button>
          </div>
        </div>    
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(SignIn);

