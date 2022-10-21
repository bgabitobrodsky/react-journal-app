import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"

export const AuthRoutes = () => {
  return (
	<Routes>
		<Route path='register' element={ <RegisterPage /> } />
		<Route path='login' element={ <LoginPage /> } />
		<Route path='/*' element={ <Navigate to='/auth/login'/> } />
	</Routes>
  )
}
