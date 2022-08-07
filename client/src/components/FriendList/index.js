import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length) {
        return <p className='bg-primary text-light p-4'>
           Make some friends and see what games they're playing!</p>;
    }

  return (
    <div>
        <h5>
            {username}'s {friendCount=== 'friends'}
        </h5>
        {friends.map(friend => (
            <button className='btn w-100 display-block' key={friend._id}>
            <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
            </button>
         ))}
    </div>
  );
};

export default FriendList;