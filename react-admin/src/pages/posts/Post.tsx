import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Game from '../../components/Game';
import Wrapper from '../../components/Wrapper';

const Post = () => {
    let { id }: any = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [thread_id, setThreadId] = useState('1');
    const [user_id, setUserId] = useState();
    const [game_pgn, setGamePgn] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [created_at, setCreatedAt] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`posts/${id}`);
                setUserId(response.data.user_id);
                setTitle(response.data.title);
                setBody(response.data.body);
                setImage(response.data.image);
                setThreadId(response.data.thread_id);
                setGamePgn(response.data.game_pgn);
                setCreatedAt(response.data.created_at);
                console.log(game_pgn)

                const user_data = await axios.get(`users/${user_id}`)
                setAuthor(user_data.data.first_name + " " + user_data.data.last_name)



            }
        )();
    }, []);
    return (
        <Wrapper>
            {/* Page Header */}
            <header>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10">
                            <div className="post-heading">
                                <h1>{title}</h1>
                                <h2 className="subheading">{body}</h2>

                            </div>
                            <span className="meta">Posted by {author} on {created_at}
                            </span>
                            <Game pgnString={game_pgn} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Comments */}

        </Wrapper>
    )
}

export default Post