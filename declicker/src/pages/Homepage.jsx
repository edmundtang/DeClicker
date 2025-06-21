import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createSession from "../actions/firebaseActions";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig"; // your firebase setup

export default function HomePage() {
    const [hovered, setHovered] = useState(null);
    const [joinCode,setJoinCode] = useState("");
    const navigate = useNavigate();
    const exisiting = localStorage.getItem("hostSessionCode");
    const [sessionExists, setSessionExists] = useState(null);

    useEffect(() => {
    const checkSessionInFirebase = async () => {
      if (!exisiting) {
        setSessionExists(false);
        return;
      }

      const docRef = doc(firestore, "sessions", exisiting);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSessionExists(true);
      } else {
        localStorage.removeItem("hostSessionCode");
        setSessionExists(false);
      }
    };

    checkSessionInFirebase();
  }, [exisiting]);

    const joinSession = () => {
        navigate(`/${joinCode}/session`)
    }

    const resumeSession = () => {
        navigate(`/${exisiting}/host`)
    }

    const hostSession = async () => {
        const result = await createSession();
        if (result.success) {
            console.log("success")
            localStorage.setItem("hostSessionCode", result.sessionCode)
            navigate(`/${result.sessionCode}/host`)
        } else {
            console.error("Session creation failed:", result.reason || result.error);
        }
    }

    return(
        <div className="flex flex-col md:flex-row bg-[#141414] text-white w-full h-screen transition-all duration-500 ease-in-out">
            {/* Left Side */}
            <div 
            onMouseEnter={() => setHovered('left')}
            onMouseLeave={() => setHovered(null)}
            className={`relative content-center text-center font-bold w-full hidden md:block md:h-full md:border-r-8 md:border-[#3c3c3c] h-1/2 overflow-hidden transition-all duration-500 ease-in-out
    ${hovered === 'left' ? 'md:w-3/5 bg-[#28283c]' : hovered === 'right' ? 'md:w-2/5 bg-[#282828]' : 'md:w-1/2'}
  `}>
                {sessionExists ? 
                 <div>
                    <h1 className="pb-2">Resume Session - {exisiting}</h1>
                    <button onClick={() => resumeSession() }type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        RESUME
                    </button>

                    <h1 className="p-4">OR</h1>
                    <h1 className="pb-2">Create a New Session</h1>
                    <button onClick={() => hostSession() }type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        START
                    </button>
                </div>

                :
                <div>
                    <h1 className="pb-2">Create a Session</h1>
                    <button onClick={() => hostSession() }type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        START
                    </button>
                </div>

                }
            </div>
            {/* Right Side */}
            <div 
            onMouseEnter={() => setHovered('right')}
            onMouseLeave={() => setHovered(null)}
            className={`font-bold relative content-center text-center w-full h-full overflow-hidden transition-all duration-500 ease-in-out
    ${hovered === 'left' ? 'md:w-2/5 bg-[#282828]' : hovered === 'right' ? 'md:w-3/5 bg-[#28283c]' : 'md:w-1/2'}
  `}>
                <h1 className="pb-2">Join a Session</h1>
                <form className="flex w-full flex-col content-center items-center">
                    <input id="JoinID" className="uppercase p-2 m-2 w-1/2 bg-grey-800 text-center rounded-lg text-black" placeholder="INSERT JOIN CODE" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())}/>
                    <button onClick={() => joinSession()} type="button" className=" w-1/4 text-gray-900 border border-gray-300 focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-70">
                        JOIN
                    </button>
                </form>

            </div>
        </div>
    )
}

