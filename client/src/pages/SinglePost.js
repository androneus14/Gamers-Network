import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST} from '../utils/queries'
import Auth from '../utils/auth';

import RatingSystem from '../components/RatingSystem';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SinglePost = props => {
    const { id: postId } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId },
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='card mb-3'>
                <h3 className='card-header'>
                    {post.postAuthor} <br />
                    <span style={{ fontSize: '1rem '}}>
                        started this discussion on {post.createdAt}
                    </span>
                </h3>

                <div className='bg-light py-4'>
                    <div className='card-body'>
                        <p>{post.gameTitle}</p>
                    </div>
                    <div className='card-body'>
                        <p>{post.gameReview}</p>
                    </div>
                    <div className='card-body'>
                        <span>
                            {[1,2,3,4,5].map((value) => (
                            <RatingSystem
                                key={post.gameRating}
                                filled={value <=post.gameRating}
                            />
                            ))}
                        </span>
                    </div>
                </div>

                {post.commentCount > 0 && (
                    <CommentList comments={post.comments} />
                )}

                {Auth.loggedIn() && <CommentForm postId={post._id} />}
            </div>
        </div>
    );
};

export default SinglePost;