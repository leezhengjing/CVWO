import axios from 'axios';
import React, { FunctionComponent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Thread } from '../models/thread';
import ImageUpload from './ImageUpload';
import Wrapper from './Wrapper';

interface Props {
    user_id?: string;
    post_id?: number;
}



const CommentContainer: FunctionComponent<Props> = ({ user_id, post_id }) => {
    const [redirect, setRedirect] = useState(false);
    const [comment_body, setCommentBody] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (
            async () => {

                const data = await axios.get('comments');
            }
        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('comments', {
            description: comment_body,
            post_id: Number(post_id),
            user_id: Number(user_id)
        });


        setRedirect(true);
    }


    if (redirect) {
        return <Navigate to={`/posts/${post_id}`} />
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <label>Leave a comment!</label>
                    <textarea className="form-control"
                        onChange={e => setCommentBody(e.target.value)} />
                </div>
                <button className='btn btn-outline-secondary'>Save</button>
            </form>
        </div>
    )
}

export default CommentContainer;