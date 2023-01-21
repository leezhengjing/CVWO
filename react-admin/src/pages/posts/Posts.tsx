import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Post } from '../../models/post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`posts?page=${page}`);

                setPosts(data.data);
                setLastPage(data.meta.last_page);
            }
        )()
    }, [page])

    const del = async (id: number) => {

        if (window.confirm("Are you sure you want to delete this record?")) {
            await axios.delete(`posts/${id}`);
            setPosts(posts.filter((p: Post) => p.id !== id))
        }

    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/posts/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Body</th>

                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((p: Post) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} width="50" /></td>
                                    <td>{p.title}</td>
                                    <td>{p.body}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/posts/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => del(p.id)}
                                            >Delete</a>
                                        </div>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
        </Wrapper >
    )
}

export default Posts;