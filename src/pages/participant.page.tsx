import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchParticipant, fetchPiece, Participant, Piece} from "../services/exhibiion.service";
import {Loading} from "../components/loading.component";
import {date2Human} from "../components/piece.component";
import {Helmet} from "react-helmet";


export function ParticipantPage() {
    const [loading, setloading] = useState(true);
    const [participant, setParticipant] = useState<Participant>({} as Participant);
    const { username = "" } = useParams<string>();

    useEffect(() => {
        setloading(true);
        fetchParticipant(username).then(res => {
            setParticipant(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        });
    }, [username]);

    if (loading) return <Loading/>

    return (
        <>
            <Helmet>
                <title>{ "DOEST gallery - " + (username) }</title>
            </Helmet>
        <div className="container">
            <div className="row mt-5">
                <div className="col-12">
                    <h3 className="mb-0">{participant.username}</h3>
                    <p className="mb-2">{participant.affiliated_party}</p>
                </div>
                <div className="col-12">
                    <div className="row">
                    {
                        participant.pieces.map((p: Piece) => {
                            return (
                                <>
                                <div key={p.slug} className="col-12 col-md-4 col-lg-3">
                                    <Link to={"/piece/" + p.tweet_id}>
                                        <img src={p.artifact_url_1} className="img-fluid"/>
                                    </Link>
                                    <div className="d-flex justify-content-between">
                                        <p><small>{date2Human(p.tweeted_at)}</small></p>
                                        <a href={"https://twitter.com/twitter/status/" + p.tweet_id} target="_blank" rel="noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#000000"
                                                 className="bi bi-twitter" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                </>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}