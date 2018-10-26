import React from 'react';
import CallApi from "../../../api/api";
import FavoriteIcon from '../../Movies/Icons/FavoriteIcon';
import WatchIcon from '../../Movies/Icons/WatchIcon';
import * as actionsMovie from "../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MovieTabs from "./MovieTabs/MovieTabs";

class MoviePage extends React.Component {
    componentDidMount () {
        CallApi.get(`/movie/${this.props.match.params.id}`)
            .then(data => {
                this.props.getMovieDetails({
                    data
                })
            })
    }

    // ЧТо бы очистить moviesDetails. При нескольких переходах на разные фильмы, при загрузке инфы с сервера показывается инфа предыдущего фильма.
    componentWillUnmount() {
        this.props.updateMovieDetails()
    }

    render() {
        const {moviesDetails} = this.props;
        return (
            <div>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-4'>
                            <img
                                className="card-img-top"
                                src={`https://image.tmdb.org/t/p/w500${moviesDetails.backdrop_path || moviesDetails.poster_path}`}
                                alt=""
                            />
                        </div>
                        <div className='col-8'>
                            <h4><strong>{moviesDetails.title}</strong></h4>
                            <p>{moviesDetails.overview}</p>
                        <div className='d-flex align-items-center'>
                            <FavoriteIcon movieId={moviesDetails.id}/>
                            <WatchIcon movieId={moviesDetails.id}/>
                        </div>
                        </div>
                    </div>
                </div>
                <MovieTabs itemId={moviesDetails.id}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        moviesDetails: state.movie.moviesDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieDetails: actionsMovie.actionCreatorGetMovieDetails,
        updateMovieDetails: actionsMovie.actionCreatorUpdateMovieDetails
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

// constructor() {
//     super()
//     this.state = {
//         moviesDetails: {}
//     };
// };

// componentDidMount () {
//     CallApi.get(`/movie/${this.props.match.params.id}`, {
//         params: {
//             language: 'ru-RU'
//         }
//     })
//         .then(data => {
//             this.setState({
//                 moviesDetails: data
//             })
//         })
// }