import React from "react";
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreatorGetMovies, actionCreatorGetTotalPage} from '../../actions/actions'

const mapStateToProps = (state) => {
    return {
        movies: state.movies.moviesData
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovies: actionCreatorGetMovies
    }, dispatch)
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class MoviesHOC extends React.Component {
    getMovies = (filters, page) => {
        const {sort_by, primary_release_year, genres} = filters;

        const queryStringParams = {
            sort_by: sort_by,
            page: page,
            primary_release_year: primary_release_year
            // with_genres: genres.join(',') словил баг на стороне сервака
        };

        if (genres.length>0) queryStringParams.with_genres = genres.join(',');

        this.props.getMovies(queryStringParams);

        // Не работает
        this.props.getTotalPages(this.props.movies.total_pages);
    };

    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page)
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.filters, prevProps.filters)) {
            this.props.onChangePage(1);
            this.getMovies(this.props.filters, 1);
        }
        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page)
        }
    }

    render() {
        // console.log(this.props.movies.total_pages)
        const { movies } = this.props;
        return <Component movies = {movies.results}/>;
    }
}
)

// constructor() {
//     super();
//     this.state = {
//         movies: []
//     };
// }

// CallApi.get('/discover/movie', {
//     params: queryStringParams
// })
//     .then(data => {
//      this.setState({
//          movies: data.results
//      });
//     this.props.getTotalPages(data.total_pages);