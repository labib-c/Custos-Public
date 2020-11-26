import React from 'react';
import { render } from '@testing-library/react'
import Login from '../../Components/Login';
import { act } from 'react-dom/test-utils';
const login = jest.fn()
const AuthContext = React.createContext();

it("delete this", () => {
    render(<div></div>)
})
// it("renders", () => {

//     act(() => {render( <AuthContext.Provider value={login}>
//                 <Login></Login>
//             </AuthContext.Provider>)
//     })
// })