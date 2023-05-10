import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { AddUser, FetchUserByFirebaseId } from "../APIManager";

  
  export const emailAuth = {
    // Register New User
    register: function(userObj, setUserState, setIsRegisterOpen) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then(async (userCredential) => {
          const auth = getAuth();
          await updateProfile(auth.currentUser, {
            displayName: userObj.fullName,
          }).then(
            function() {
              //add to local storage
              const userAuth = {
                email: userCredential.user.email,
                isSeller: false,
                uid: userCredential.user.uid,
                type: "email"
              }
              localStorage.setItem("user", JSON.stringify(userAuth));
              //add to DB
              const dbUser = {
                name: userCredential.user.displayName,
                isSeller: false,
                dateCreated: new Date(),
                email: userCredential.user.email,
                firebaseId: userCredential.user.uid,
                image: null
              }
              AddUser(dbUser)
              setUserState(dbUser)
              setIsRegisterOpen(false)
            },
            function(error) {
              console.log("Email Register Name Error")
              console.log("error code", error.code)
              console.log("error message", error.message)
              window.alert('Invalid Credentials')
            }
          );
        })
        .catch((error) => {
          console.log("Email Register Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
          window.alert('Invalid Credentials')
        });
    },
    // Sign in existing user
    signIn: function(userObj, setUserState, setIsLoginModalOpen) {
      return new Promise((res) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userObj.email, userObj.password)
          .then(async (userCredential) => {
            const dbUser = await FetchUserByFirebaseId(userCredential.user.uid)
            setUserState(dbUser)
            const userAuth = {
              email: userCredential.user.email,
              isSeller: dbUser.isSeller,
              uid: userCredential.user.uid,
              type: "email"
            }
            localStorage.setItem("user", JSON.stringify(userAuth))
            setIsLoginModalOpen(false)
          })
          .catch((error) => {
            console.log("Email SignIn Error")
            console.log("error code", error.code)
            console.log("error message", error.message)
            window.alert('Invalid Credentials')
          });
      });
    },
    // Sign out
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
          console.log("signOut Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
        })
    },
  }