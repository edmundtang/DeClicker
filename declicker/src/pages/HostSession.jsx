import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HostSession = () => {
    const {sessionCode} = useParams();
    const [sessionData, setSessionData] = useState([]);

    return(
        <div className="flex flex-col flex-grow text-white bg-[#141414] p-10">
            <div className="relative text-center w-full text-xl p-5" >
                <h1>Host Session - {sessionCode}</h1>
            </div>
            <div className="w-full flex-grow p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div>
                    <button type="button" className="button p-2 m-2 bg-[blue] rounded">RESULTS VIEW</button>
                    <button type="button" className="button p-2 m-2 bg-[blue] rounded">SHOW/HIDE RESULTS</button>
                </div>
                <div className="flex flex-row">
                    <h1 className="w-1/2 content-center">Users Connected: </h1>
                    <h1 className="w-1/2 content-center">Responded: </h1>
                </div>
                <div className="flex flex-row">
                    <h1 className="content-center font-bold">Controls:</h1>
                    <div>
                        <button type="button" className="button p-2 m-2 bg-[green] rounded">Start</button>
                        <button type="button" className="button p-2 m-2 bg-[red] rounded">Pause</button>
                        <button type="button" className="button p-2 m-2 bg-[blue] rounded">Reset</button>
                    </div>
                </div>
                <div>
                    <h1>Settings</h1>
                    <h2>Hide Results from User</h2>
                    <h2>Anonymous Results</h2>
                    <h2>Amount of Options</h2>
                    <h2>Timer</h2>
                    <div>
                        <label>Poll Question: </label>
                        <input type="text" className="input " />    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostSession;