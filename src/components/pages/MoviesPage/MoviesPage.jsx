import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import Pagination from "../../Filters/Pagination";
import _ from "lodash";

export default class MoviesPage extends React.Component {
    constructor() {
        super()
        this.state = {
            filters: {
                sort_by: 'vote_average.asc',
                primary_release_year: '2018',
                genres: []
            },
            page: 1,
            total_pages: ''
        };

        this.initialState = _.cloneDeep(this.state)
    };

    onChangeFilters = (event) => {
        const newFilters = {
            ...this.state.filters,
            [event.target.name]: event.target.value
        };
        this.setState(prevState => ({
            filters: newFilters
        }));
    };

    clearFilters = () => {
        this.setState(this.initialState);
    };

    onChangePage = page => {
        this.setState({
            // page: page
            page
        })
    };

    getTotalPages = total_pages => {
        this.setState({
            total_pages
        });
    };

    onChangeGenres = (event) => {
        const id = event.target.value;

        (event.target.checked) ? (
                this.setState((prevState) =>({
                    filters: {
                        ...prevState.filters,
                        genres: [...prevState.filters.genres, id]
                    }
                }))
            ) :
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    genres: prevState.filters.genres.filter(genreId => {
                        return genreId !== id
                    })
                }
            }))
    };

    render() {
        const {filters, page, total_pages} = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{ width: "100%" }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <h3 className='mr-2'>Фильтры:</h3>
                                    <button
                                        type='button'
                                        className='btn'
                                        onClick={this.clearFilters}
                                    >
                                        Очистить фильтры
                                    </button>
                                </div>
                                <Filters
                                    filters={filters}
                                    page={page}
                                    total_pages={total_pages}
                                    onChangeFilters={this.onChangeFilters}
                                    onChangePage={this.onChangePage}
                                    onChangeGenres={this.onChangeGenres}
                                />
                                <Pagination
                                    page={page}
                                    total_pages={total_pages}
                                    onChangePage={this.onChangePage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList
                            page={page}
                            filters={filters}
                            onChangePage={this.onChangePage}
                            getTotalPages={this.getTotalPages}
                        />
                    </div>
                </div>
            </div>
        );
    }
}