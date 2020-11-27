import React from 'react';
import { render } from '@testing-library/react'
import ProfileCard from '../../Components/ProfileCard';
import {AuthProvider} from '../../Context/AuthContext'
import { act } from 'react-dom/test-utils';
import firebase from 'firebase/app';

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
                            <ProfileCard></ProfileCard>
                    </AuthProvider>)
    })
})
