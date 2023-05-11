import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";
import { AddUser, FetchUserByFirebaseId } from "../APIManager";
import { useNavigate } from "react-router";

  
  export const googleAuth = {
    // Works to sign in AND register a user
    signInRegister: function(setUserState, setIsLoginModalOpen) {
      return new Promise((res) => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithPopup(auth, provider)
          .then(async (userCredential) => {
            let dbUser = await FetchUserByFirebaseId(userCredential.user.uid)
            if (dbUser.title === "Not Found") {
              dbUser = {
                name: userCredential.user.displayName,
                isSeller: false,
                dateCreated: new Date(),
                email: userCredential.user.email,
                firebaseId: userCredential.user.uid,
                image: null
              }
              await AddUser(dbUser)
            }
            setUserState(dbUser)
            const userAuth = {
              email: userCredential.user.email,
              isSeller: dbUser.isSeller,
              uid: userCredential.user.uid,
              type: "google",
            }
            localStorage.setItem("user", JSON.stringify(userAuth))
            setIsLoginModalOpen(false)
          })
          .catch((error) => {
            console.log("Google Sign In Error")
            console.log("error code", error.code)
            console.log("error message", error.message)
            console.log("error email", error.email)
            window.alert('Invalid Credentials')
          });
      });
    },
    // Sign out a user
    signOut: function(setUserState, navigate) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user")
          setUserState("")
          console.log("Sign Out Success!")
          navigate("/")
        })
        .catch((error) => {
          console.log("Google SignOut Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
          window.alert('Sign Out Error')
        })
    },
  }