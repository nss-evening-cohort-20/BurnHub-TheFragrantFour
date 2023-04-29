import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  
  // userObject expected ---->
  // {
  //   email: "",
  //   password: "",
  //   fullName: "",
  // }
  
  export const emailAuth = {
    // Register New User
    register: function(userObj, navigate) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then((userCredential) => {
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: userObj.fullName,
          }).then(
            function() {
              const userAuth = {
                email: userCredential.user.email,
                displayName: userObj.fullName,
                uid: userCredential.user.uid,
                type: "email",
              };
              // Saves the user to localstorage
              localStorage.setItem("capstone_user", JSON.stringify(userAuth));
              // Navigate us back to home
              navigate("/");
            },
            function(error) {
              console.log("Email Register Name Error");
              console.log("error code", error.code);
              console.log("error message", error.message);
            }
          );
        })
        .catch((error) => {
          console.log("Email Register Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    },
    // Sign in existing user
    signIn: function(userObj, navigate) {
      return new Promise((res) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userObj.email, userObj.password)
          .then((userCredential) => {
            const userAuth = {
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
              uid: userCredential.user.uid,
              type: "email",
            };
            // Saves the user to localstorage
            localStorage.setItem("capstone_user", JSON.stringify(userAuth));
            // Navigate us back to home
            navigate("/");
          })
          .catch((error) => {
            console.log("Email SignIn Error");
            console.log("error code", error.code);
            console.log("error message", error.message);
          });
      });
    },
    // Sign out
    signOut: function(navigate) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Remove the user from localstorage
          localStorage.removeItem("capstone_user");
          // Navigate us back to home
          navigate("/");
          console.log("Sign Out Success!");
        })
        .catch((error) => {
          console.log("signOut Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    },
  };