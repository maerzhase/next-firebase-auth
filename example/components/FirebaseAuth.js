/* globals window */
import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'

const EMAIL_LINK_SIGN_IN = {
  provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  // Use email link authentication and do not require password.
  // Note this setting affects new users only.
  // For pre-existing users, they will still be prompted to provide their
  // passwords on sign-in.
  signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
  // Allow the user the ability to complete sign-in cross device, including
  // the mobile apps specified in the ActionCodeSettings object below.
  forceSameDevice: false,
  // Used to define the optional firebase.auth.ActionCodeSettings if
  // additional state needs to be passed along request and whether to open
  // the link in a mobile app if it is installed.
  emailLinkSignIn: function() {
    return {
      // Additional state showPromo=1234 can be retrieved from URL on
      // sign-in completion in signInSuccess callback by checking
      // window.location.href.
      url: 'http://localhost:3000/auth',
      // Custom FDL domain.
      // dynamicLinkDomain: 'com.example.web.app',
      // Always true for email link sign-in.
      // handleCodeInApp: true,
      // Whether to handle link in iOS app if installed.
      // iOS: {
      //   bundleId: 'com.example.ios'
      // },
      // // Whether to handle link in Android app if opened in an Android
      // // device.
      // android: {
      //   packageName: 'com.example.android',
      //   installApp: true,
      //   minimumVersion: '12'
      // }
    };
  }
}


// Note that next-firebase-auth inits Firebase for us,
// so we don't need to.

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    EMAIL_LINK_SIGN_IN,
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirecting based on
      // auth state in withAuthComponent.js.
      false,
  },
}

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  )
}

export default FirebaseAuth
