import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export default async function createSession({ numOptions = 5 } = {}) {
  const sessionToken = crypto.randomUUID();
  let finalCode = null;

  // Try up to 10 times to find a unique session code
  for (let i = 0; i < 10; i++) {
    const code = generateSessionCode();
    const sessionRef = doc(firestore, "sessions", code);
    const existing = await getDoc(sessionRef);

    if (!existing.exists()) {
      finalCode = code;
      // Create the new session
      await setDoc(sessionRef, {
        sessionCode: finalCode,
        sessionToken,
        numOptions,
        createdAt: serverTimestamp(),
        question: "",
        hideResult: false,
      });
      break;
    }
  }

  if (!finalCode) {
    return {
      success: false,
      error: "too-many-collisions",
    };
  }

  return {
    success: true,
    sessionCode: finalCode,
    sessionToken,
  };
}

function generateSessionCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
