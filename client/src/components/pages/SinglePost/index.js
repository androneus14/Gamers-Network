import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_POST} from '../../../utils/queries'

import RatingSystem from '../../RatingSystem';
import CommentForm from '../../CommentForm';
import CommentList from '../../CommentList';

const SinglePost = props => {
    const { id: postId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
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
                            {[1,2,3,4,5,6,7,8,9,10].map((value) => (
                            <RatingSystem
                                key={post.gameRating}
                                filled={value <=post.gameRating}
                            />
                            ))}
                        </span>
                    </div>
                </div>

                <div className='my-5'>
                    <CommentList comments={post.comments} />
                </div>
                <div className='m-3 p-4' style={{ border: '2px dotted #1a1a1a' }}>
                    <CommentForm postId={post._id} />
                </div>
            </div>
        </div>
    );
};

export default SinglePost;