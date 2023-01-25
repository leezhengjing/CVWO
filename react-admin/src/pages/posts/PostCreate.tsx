import axios from 'axios';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import Wrapper from '../../components/Wrapper';
import { Thread } from '../../models/thread';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [thread_id, setThreadId] = useState('1');
    const [threads, setThreads] = useState([]);
    const [user_id, setUserId] = useState();
    const [game_pgn, setGamePgn] = useState('');
    const [redirect, setRedirect] = useState(false);

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('threads');

                setThreads(data.data);
                // console.log(data.data);

                const user_data = await axios.get('user');
                setUserId(user_data.data.id)
            }
        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('posts', {
            title,
            body,
            image,
            user_id: Number(user_id),
            thread_id: Number(thread_id),
            game_pgn,
        });

        setRedirect(true);
    }

    const updateImage = (url: string) => {
        if (ref.current) {
            ref.current.value = url;
        }

        setImage(url);
    }

    if (redirect) {
        return <Navigate to={`/posts/threads/${thread_id}`} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <label>Title</label>
                    <input className="form-control"
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Body</label>
                    <textarea className="form-control"
                        onChange={e => setBody(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Game PGN - Please copy paste the moves only</label>
                    <textarea className="form-control"
                        onChange={e => setGamePgn(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Image</label>
                    <div className='input-group'>
                        <input className="form-control"
                            value={image}
                            ref={ref}
                            onChange={e => setImage(e.target.value)} />
                        <ImageUpload uploaded={updateImage} />

                    </div>
                </div>
                <div className="mb-3">
                    <label>Thread</label>
                    <select className="form-control" onChange={e => setThreadId(e.target.value)}>
                        {threads.map((t: Thread) => {
                            return (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button className='btn btn-outline-secondary'>Save</button>

            </form>
        </Wrapper>
    )
}

export default PostCreate;