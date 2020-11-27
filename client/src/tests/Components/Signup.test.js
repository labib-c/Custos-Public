import React from 'react';
import { render } from '@testing-library/react'
import Signup from '../../Components/Signup';
import { act } from 'react-dom/test-utils';
import {AuthProvider} from '../../Context/AuthContext'
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';

const onAuthStateChanged = jest.fn()
const createUserWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve('result of createUserWithEmailAndPassword')
})

const signInWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve('result of signInWithEmailAndPassword')
  })

const initializeApp = jest
    .spyOn(firebase, 'initializeApp')
    .mockImplementation(() => {
        return {
            auth: () => {
            return {
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                currentUser: {
                sendEmailVerification
                },
                signInWithRedirect
            }
            }
        }
    })

jest.spyOn(firebase, 'auth').mockImplementation(() => {
    return {
        onAuthStateChanged,
        currentUser: {
        displayName: 'testDisplayName',
        email: 'test@test.com',
        emailVerified: true
        },
        getRedirectResult,
        sendPasswordResetEmail
    }
})


it("renders", () => {
    act(() => {render(<AuthProvider>
                        <Router>
                            <Signup></Signup>
                        </Router>
                    </AuthProvider>)
    })
})

