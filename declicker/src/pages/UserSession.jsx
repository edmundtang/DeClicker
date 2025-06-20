import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


const UserSession = () => {
    const [userResponse, setUserResponse] = useState("");
    const [userName, setUserName] = useState("");
    const [numOptions, setNumOptions] = useState(5);
    const {sessionCode} = useParams();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [pollView, setPollView] = useState(false);


    return (
        <div>
            {pollView ? 
            <div>
                <h1> Poll View </h1>
                <button type="button" className="p-4 bg-blue-600 text-white" onClick={() => setPollView(false)}>RETURN</button>

            </div>
        :
            <div className="flex flex-col">
            <h1>User Session - {sessionCode} </h1>
            {Array.from({ length: numOptions }).map((_, i) => (
        <button
          key={i}
          className="p-4 m-3 mr-10 ml-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setPollView(true)}
        >
          {alphabet[i]}
        </button>
      ))}
        </div>
        }
        </div>
    )
}

export default UserSession;