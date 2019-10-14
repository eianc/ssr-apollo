import React, { Fragment } from 'react';
import  {useQuery } from '@apollo/react-hooks';
import { getUser } from '../queries/user';

const User = () => {
    const { loading, error, data } = useQuery(getUser);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! ${error.message}</p>;
    console.log(data, 'data');

    return (
        <div>{data.user.username}</div>
    )
}

export default User;