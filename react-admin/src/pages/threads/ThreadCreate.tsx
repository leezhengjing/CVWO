import axios from 'axios';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const ThreadCreate = () => {
    const [thread_name, setThreadName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('threads');

                setThreads(data.data);
            }
        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('threads', {
            name: thread_name
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={`/threads`} />
    }
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <label>Thread Name</label>
                    <input className="form-control"
                        onChange={e => setThreadName(e.target.value)} />
                </div>
                <button className="btn btn-outline-secondary">Create Thread</button>
            </form>
        </Wrapper>
    )
}

export default ThreadCreate;