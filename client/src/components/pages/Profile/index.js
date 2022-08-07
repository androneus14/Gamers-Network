import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../../utils/queries';
import { ADD_FRIEND } from '../../../utils/mutations';

import Auth from '../../../utils/auth';

import PostList from '../../PostList';
import FriendList from '../../FriendList';

const Profile = (props) => {
    const [addFriend] = useMutation(ADD_FRIEND);
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to='/profile:username' />
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    const handleFriendClick = async () => {
        try {
            await addFriend({
                variables: { id: user._id }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className='flex-row justify-center mb-3'>
                <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>
                {userParam && (
                    <button className="btn btn-primary" onClick={handleFriendClick}>
                        Friend Me!
                    </button>
                )}
            </div>
            <div className='col-12 col-md-10 mb-5'>
                <PostList
                    posts={user.posts}
                    title={`${user.username}'s posts `}
                />
            </div>

            <div className='col-12 col-md-10 mb-3'>
                <FriendList
                    username={user.username}
                    friendCount={user.friendCount}
                    friends={user.friends}
                />
            </div>
        </div>
    );
};

export default Profile;