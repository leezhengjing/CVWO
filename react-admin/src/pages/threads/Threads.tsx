import React from "react";
import Wrapper from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import Paginator from "../../components/Paginator";
import { Link, Navigate } from "react-router-dom";
import { Thread } from "../../models/thread";

export const Threads = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('threads');

                setThreads(data.data);
            }
        )();
    }, []);
    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/threads/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {threads.map((thread: Thread) => {
                            return (
                                <tr key={thread.id}>
                                    <td>{thread.id}</td>
                                    <td><Link to="/posts" >{thread.name}</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}