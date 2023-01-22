import axios from 'axios';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import Wrapper from '../../components/Wrapper';
import { Thread } from '../../models/thread';

const PostEdit = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [thread_id, setThreadId] = useState('1');
    const [threads, setThreads] = useState([]);
    const [user_id, setUserId] = useState();
    const [redirect, setRedirect] = useState(false);

    const ref = useRef<HTMLInputElement>(null);

    let { id }: any = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`posts/${id}`);
                setUserId(response.data.user_id);
                setTitle(response.data.title);
                setBody(response.data.body);
                setImage(response.data.image);
                setThreadId(response.data.thread_id);

                const { data } = await axios.get('threads');

                setThreads(data.data);


                // const user_data = await axios.get(`user`);
                // console.log((user_id === user_data.data.id))
                // if (user_data.data.id !== user_id) {
                //     setRedirect(true);
                // }



            }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`posts/${id}`, {
            title,
            body,
            image,
            user_id: Number(user_id),
            thread_id: Number(thread_id)
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
                        defaultValue={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Body</label>
                    <textarea className="form-control"
                        defaultValue={body}
                        onChange={e => setBody(e.target.value)} />
                </div>
                <div className='input-group'>
                    <input className="form-control"
                        value={image}
                        ref={ref}
                        onChange={e => setImage(e.target.value)} />
                    <ImageUpload uploaded={updateImage} />

                </div>
                <div className="mb-3">
                    <label>Thread</label>
                    <select className="form-control"
                        value={thread_id}
                        onChange={e => setThreadId(e.target.value)}>
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
};

export default PostEdit;