import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addCommentm, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addCommentm({
                variables: {
                    commentText,
                    postId
                },
            });

            setCommentText('');
            setCharacterCount(0);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setCommentText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    return (
        <div>
            <p 
                className={`m-0 ${
                    characterCount === 280 || error ? 'text-danger' : ''
                }`}
            >
                Character Count: {characterCount}/280
                {error && <span className='ml-2'>{error.message}</span>}
            </p>
            <form
                className='flex-row justify-center justify-space-between-md align-center'
                onSubmit={handleFormSubmit}
            >
                <textarea
                    name='commentText'
                    placeholder='Add your comment here...'
                    value={commentText}
                    className='form-input w-100'
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                ></textarea>

                <button 
                    className='btn btn-primary btn-block py-3'
                    id='submit-btn'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CommentForm;