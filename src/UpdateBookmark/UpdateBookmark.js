import React from 'react';
import './UpdateBookmark.css';
import config from '../config'; 

class UpdateBookmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            bookmark: {
                id: this.props.bookmarkInfo.id,
                title: this.props.bookmarkInfo.title,
                url: this.props.bookmarkInfo.url,
                description: this.props.bookmarkInfo.description,
                rating: this.props.bookmarkInfo.rating
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        let url = config.API_ENDPOINT + '/' + this.props.bookmarkInfo.id;
        fetch(url, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(this.state.bookmark)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(`Could not update the bookmark`)
                }
                this.props.updateBookmark(this.state.bookmark);
                this.props.history.push('/');
            })
            .catch(error => console.log(error));

    }

    onTitleChange = e => {
        let currentBookmarkState = this.state.bookmark;
        currentBookmarkState.title = e.target.value;
        this.setState({
            bookmark: currentBookmarkState
        });
    }

    onUrlChange = e => {
        let currentBookmarkState = this.state.bookmark;
        currentBookmarkState.url = e.target.value;
        this.setState({
            bookmark: currentBookmarkState
        });
    }

    onDescriptionChange = e => {
        let currentBookmarkState = this.state.bookmark;
        currentBookmarkState.description = e.target.value;
        this.setState({
            bookmark: currentBookmarkState
        });
    }

    onRatingChange = e => {
        let currentBookmarkState = this.state.bookmark;
        currentBookmarkState.rating = e.target.value;
        this.setState({
            bookmark: currentBookmarkState
        });
    }

    render() {
        const error = this.state.error;
        const history = this.props.history;
        return (
        <section className='UpdateBookmark'>
            <h2>Update a bookmark</h2>
            <form
            className='UpdateBookmark__form'
            onSubmit={this.handleSubmit}
            >
            <div className='UpdateBookmark__error' role='alert'>
                {error && <p>{error.message}</p>}
            </div>
            <div>
                <label htmlFor='title'>
                Title
                {' '}
                </label>
                <input
                    type='text'
                    name='title'
                    id='title'
                    value={this.state.bookmark.title}
                    onChange={this.onTitleChange}
                />
            </div>
            <div>
                <label htmlFor='url'>
                URL
                {' '}
                </label>
                <input
                    type='text'
                    name='url'
                    id='url'
                    value={this.state.bookmark.url}
                    onChange={this.onUrlChange}
                />
            </div>
            <div>
                <label htmlFor='description'>
                Description
                </label>
                <textarea
                    name='description'
                    id='description'
                    placeholder='enter your description here'
                    value={this.state.bookmark.description}
                    onChange={this.onDescriptionChange}
                />
            </div>
            <div>
                <label htmlFor='rating'>
                Rating
                {' '}
                </label>
                <input
                    type='number'
                    name='rating'
                    id='rating'
                    min='1'
                    max='5'
                    value={this.state.bookmark.rating}
                    onChange={this.onRatingChange}
                />
            </div>
            <div className='UpdateBookmark__buttons'>
                <button type='button' onClick={() => history.push('/')}>
                Cancel
                </button>
                {' '}
                <button type='submit'>
                Save
                </button>
            </div>
            </form>
        </section>
        );
    }
}

export default UpdateBookmark;