import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
        return <h3>No Comments Yet. Be the first!</h3>
    }

    return (
        <div className='card mb-3'>
            {comments &&
                comments.map((comment) => (
                    <p className='mb-3' key={comment._id}>
                        {'- "'}
                        {comment.commentText}
                        {'"'}
                        <br></br>
                        {'- commented by '}

                        <Link to={`/profile/${comment.username}`}>
                            {comment.username} on {comment.createdAt}
                        </Link>
                        {' -'}
                    </p>
                ))}
        </div>
    );
};

export default CommentList;