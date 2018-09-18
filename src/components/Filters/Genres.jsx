import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends React.Component {
    constructor() {
        super();

        this.state = {
            genreList: []
        };
    }

    getGenres = () => {
        const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    genreList: data.genres
                })
            })
    }

    componentDidMount() {
        this.getGenres()
    }


    render() {
        const { genreList } = this.state;

        return (
            <div className="container">
                {genreList.map(item => {
                    return (
                        <div className='form-check' key={item.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={item.id}
                                // id="defaultCheck1"
                                checked={this.props.genres.includes(String(item.id))}
                                onChange={this.props.onChangeGenres}
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                {item.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }
}