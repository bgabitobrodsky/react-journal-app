import { Google } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { AuthLayout } from '../layout'
import { useForm } from "../../hooks"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"

export const LoginPage = () => {

	const { status, errorMessage } = useSelector( state => state.auth);

	const dispatch = useDispatch();

	const { email, password, onInputChange, formState } = useForm({
		email: '',
		password: ''
	})

	const isAuthenticating = useMemo( () => status === 'checking', [status] )

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch( startLoginWithEmailPassword( formState ));
	}

	const onGoogleSignIn = () => {
		dispatch( startGoogleSignIn() );
	}

  	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={ onSubmit }>
				<Grid container>
					<Grid item xs={ 12 } sx={{ mt:2 }}>
						<TextField 
							label="Correo" 
							type="email"
							placeholder="correo@gmail.com"
							fullWidth 
							name="email"
							value={ email }
							onChange={ onInputChange }
						/>
					</Grid>
					<Grid item xs={ 12 } sx={{ mt:2 }}>
					<TextField 
						label="Contraseña" 
						type="password"
						fullWidth 
						name="password"
						value={ password }
						onChange={ onInputChange }
						/>
					</Grid>

					<Grid container
						spacing={ 2 }
						sx={{ mb:2, mt:1 }}
					>
						<Grid 
							item 
							xs={12}
							display={ !!errorMessage ? '': 'none' }
						>
							<Alert severity="error">{ errorMessage }</Alert>
						</Grid>
						<Grid item xs={ 12 } sm={ 6 }>
							<Button 
								disabled={ isAuthenticating }
								variant="contained" 
								fullWidth 
								type="submit">
							Login
							</Button>
						</Grid>

						<Grid item xs={ 12 } sm={ 6 }>
							<Button 
								disabled={ isAuthenticating }
								variant="contained" 
								fullWidth 
								onClick={ onGoogleSignIn }>
								<Google/>
								<Typography sx={{ ml:1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

				</Grid>

				<Grid container
					direction="row"
					justifyContent="end"
				>
					<Link component={RouterLink} color="inherit" to="/auth/register">
						Crear una cuenta
					</Link>
				</Grid>
			</form>
		</AuthLayout>
  	)
}
