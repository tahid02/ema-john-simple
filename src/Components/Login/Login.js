



import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import {UserContext} from '../../App'
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
// firebase.initializeApp(firebaseConfig)


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    // newUser:false,
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  })

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider();


  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)

      .then(res => {
        const { displayName, photoURL, email } = res.user

        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }

        setUser(signedInUser)
        history.replace(from);
        console.log(displayName, photoURL, email);

      })

      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }






const handleFbSignIn   = () => {
  firebase
  .auth()
  .signInWithPopup(fbprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    history.replace(from);
    console.log('fb user',user);
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
}








  const handleSignOut = () => {
    firebase.auth().signOut()

      .then(res => {

        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
          photo: ''
        }

        setUser(signedOutUser)

      })



      .catch(err => {
        console.log(err)
        console.log(err.message)
      })

  }

  const handleChange = (e) => {
    // console.log(e.target.name,e.target.value);
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)


    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && isPasswordHasNumber;




    }



    if (isFieldValid) {

      const newUserInfo = { ...user }

      newUserInfo[e.target.name] = e.target.value //setting property in user object
      setUser(newUserInfo)
    }

  }



  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
        //   setLoggedInUser(newUserInfo)
          updateUserName(user.name)
          history.replace(from);
          // console.log('user is ', user)
        })
        .catch((error) => {

          const newError = { ...user }
        //   newError.photo = errorImage
          newError.error = error.message;
          newError.success = false;
          setUser(newError)
          console.log(newError)
        });
    }




    if (!newUser && user.email && user.password) {

      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
          history.replace(from);
          console.log('sign in user info', user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
        });
    }
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName:name 
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
      console.log('user name updated successfully');
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }
  return (
    <div style={{textAlign:'center'}}>

      {
        user.isSignedIn ? <button onClick={handleSignOut}> sign out </button> :
          <button onClick={handleSignIn}> sign in </button>
      }
      <br/>
      <button onClick= {handleFbSignIn}> sign in by facebook </button>
      
      {
        user.isSignedIn && <div>
          <p>welcome: {user.name}</p>
          <p>email: {user.email}</p>
          <p><img src={user.photo} alt="" /></p>
        </div>

      }
      <h1> Our own authentication</h1>
      {/*or  {...user,newUser:!user.newUser } */}

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up </label>
      <form action="" onSubmit={(e) => handleSubmit(e)}>

        {newUser && <input type="text" name="name" placeholder="enter your name" required onBlur={handleChange} />}
        <br />

        <input type="text" name="email" placeholder="enter your email" required onBlur={handleChange} />
        <br></br>
        <input type="password" name="password" placeholder='enter password' required onBlur={handleChange} />
        <br />
        <input type="submit" value={newUser ? 'sign up' : 'sign in' }/>

      </form>


      <p style={{ color: 'red' }}>{user.error}</p>
      <p><img src={user.photo} alt="" style={{ width: '100px' }} /></p>


      {user.success && <p style={{ color: 'green' }}>user {newUser ? "created" : 'logged in '} </p>}

    </div>
  );
}

export default Login;
