import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddToListByTypeHOC from "./AddToListByTypeHOC";

class FavoriteIcon extends React.Component {

    render () {
        return (
            <div
                className={this.props.disabled ? 'circle-disabled' : 'circle'}
                onClick={this.props.onChangeAdded}
            >
                <FontAwesomeIcon
                    icon="heart"
                    color={this.props.added ? 'red' : 'white'}
                />
            </div>
        )
    }
}

export default AddToListByTypeHOC(FavoriteIcon, "favorite")