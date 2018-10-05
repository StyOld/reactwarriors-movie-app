import React, { Component } from "react";
import MoviesList from "./MoviesList";
import CallApi from "../../api/api";
import _ from 'lodash';
// import { API_URL, API_KEY_3 } from "../../api/api";
// import queryString from 'query-string';


export default class MoviesContainer extends Component {
    constructor() {
        super();

        this.state = {
            movies: []
        };
    }

    getMovies = (filters, page) => {
        const {sort_by, primary_release_year, genres} = filters;
        // let strGenres = genres.join(',');

        const queryStringParams = {
            // api_key: API_KEY_3,
            language: 'ru-RU',
            sort_by: sort_by,
            page: page,
            primary_release_year: primary_release_year,
            with_genres: genres.join(',')
        }

        // const getQueryStringParams = (object) => {
        //   let string: '';
        //   for (let key in object) {
        //       string = string + '&${key}=${object[key]}';
        //   }
        //   return '?' + $string.substring(1, string.length);
        // };

        // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}`;
        // const link = `${API_URL}/discover/movie${getQueryStringParams(queryString)}';
        // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=28%2C37%2C36`;

        // const link  = `${API_URL}/discover/movie?${queryString.stringify(
        //     queryStringParams
        // )}`;
        //
        // fetch(link)
        //     .then(response => {
        //         return response.json();
        //     })

        CallApi.get('/discover/movie', {
            params: queryStringParams
        })
            .then(data => {
                this.setState({
                    movies: data.results
                });
                this.props.getTotalPages(data.total_pages);
            })
    };

    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page)
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
    //         // const {
    //         //     filters: {sort_by}
    //         //  } = this.props;
    //         // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    //         // fetch(link)
    //         //     .then(response => {
    //         //         return response.json();
    //         //     })
    //         //     .then(data => {
    //         //         this.setState({
    //         //             movies: data.results
    //         //         });
    //         //     });
    //         this.getMovies(nextProps.filters);
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (
            // this.props.filters.sort_by !== prevProps.filters.sort_by ||
        // this.props.filters.primary_release_year !== prevProps.filters.primary_release_year)  {
            !_.isEqual(this.props.filters, prevProps.filters)) {
            this.props.onChangePage(1);
            this.getMovies(this.props.filters, 1);
        }

        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page)
        }
    }

    render() {
        const { movies } = this.state;
        return <MoviesList movies = {movies} />;
    }
}
