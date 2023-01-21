import React, { useState } from 'react';
import Wrapper from '../../components/Wrapper';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [thread, setThread] = useState('');

    return (
        <Wrapper>
            <form>
                <div className='mb-3'>
                    <label>Title</label>
                    <input className="form-control" />
                </div>
                <div className='mb-3'>
                    <label>Body</label>
                    <textarea className="form-control" />
                </div>
                <div className='mb-3'>
                    <label>Image</label>
                    <input className="form-control" />
                </div>
                <div className='mb-3'>
                    <label>Thread</label>
                    <input className="form-control" />
                </div>
                <button className='btn btn-outline-secondary'>Save</button>

            </form>
        </Wrapper>
    )
}

export default PostCreate;