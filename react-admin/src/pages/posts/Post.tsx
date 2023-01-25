import "./../../styles/PostContainer.scss";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Game from '../../components/Game';
import Wrapper from '../../components/Wrapper';
import CommentContainer from "../../components/CommentContainer";
import { Comments } from "../../models/comment";

const Post = () => {
    let { id }: any = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [thread_id, setThreadId] = useState('1');
    const [user_id, setUserId] = useState();
    const [post_user_id, setPostUserId] = useState();
    const [game_pgn, setGamePgn] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [created_at, setCreatedAt] = useState('');
    const [author, setAuthor] = useState('');
    const [comments, setComments] = useState([]);


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
                setPostUserId(response.data.user_id);


                const user_data = await axios.get(`users/${user_id}`)
                setAuthor(user_data.data.first_name + " " + user_data.data.last_name)

                const logged_in_user_data = await axios.get(`user`)
                setUserId(logged_in_user_data.data.id)

                const comment_data = await axios.get(`comments`)
                setComments(comment_data.data.data)
            }
        )();
    }, []);
    const del = async (id: number) => {
        if (window.confirm("Confirm Delete?")) {
            await axios.delete(`posts/${id}`);
        }
    }

    return (
        <Wrapper>
            {/* Page Header */}
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10">
                            <div className="post-heading">
                                <h1>{title}</h1>
                                <h2 className="subheading">{body} </h2>
                            </div>
                            <span className="meta">Posted by {author} on {created_at}
                            </span>
                            <Game pgnString={game_pgn} />
                            <h3>
                                {
                                    user_id == post_user_id
                                        ? (<>
                                            <Link to={`/posts/${id}/edit`} className="box1">Edit</Link>
                                            <Link to={'#'} onClick={() => del(id)} className="box2">Delete</Link>
                                        </>)
                                        : <span className="label">No actions to be made...</span>
                                }
                            </h3>
                        </div>
                    </div>
                </div>
            </header>
            <hr></hr>
            {/* Comments */}
            <h2>Comments:</h2>
            <tbody>
                {comments.map((c: Comments) => {
                    return (
                        <tr key={c.id}>
                            <hr></hr>
                            <td>{c.description}</td>
                            <td className="comment-text">Posted by {c.user_id}</td>
                        </tr>
                    )
                })}
            </tbody>
            <CommentContainer user_id={user_id} post_id={id} />
        </Wrapper >
    )
}

export default Post