import React,{Component} from 'react'; 
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends Component {
    componentDidMount = () => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init(
            {
                clientId: '933696667155-caq71e442nnqvu8i4pilbsmit9gim78l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthBtn =() => {
        let {isSignedIn} = this.props;
        if(isSignedIn) {
            return <button onClick={this.onSignOutClick} className="ui red google button"> <i className="google icon">Sign Out</i></button>
        }
        else 
            return <button onClick={this.onSignInClick} className="ui red google button"> <i className="google icon">Sign In</i></button>
    }
    render() {
        return this.renderAuthBtn();
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}
export default connect( mapStateToProps, {signIn, signOut} )(GoogleAuth);