import React, {Fragment} from 'react';
import {connect} from 'react-redux';

const StreamList = ({isSignedIn}) => {
    return <Fragment>
        {isSignedIn
            ? <div>
                    Welcome, Here is your Streams List
                </div>
            : <div>Thank you for visiting the website, hope to see you soon!
            </div>}
    </Fragment>;
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps)(StreamList);