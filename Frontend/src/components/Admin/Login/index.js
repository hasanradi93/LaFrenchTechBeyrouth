import { useAnimation } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../services/AuthContext'
import { darkGray } from '../../../services/colors'
import backend from '../../../services/ConnectWithBackend'
import { setCookie } from '../../../services/CookiesData'
import { ColumnForm, FormButton, FormInput, FormInputRow, FormLabel, FormMessage, FormTitle, FormWrapper, LoginSection, RowForm } from './LoginStyles'

const Login = () => {
    const [userNameEmail, setUsernameEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [pressed, setPressed] = useState(false)
    const initial = { opacity: 0, y: 30 }
    const transition = { delay: 0.3, duration: 0.6 }
    const animation = useAnimation()
    const navigate = useNavigate()
    const { ref, inView } = useInView({ threshold: 0.2 });
    const { loggedIn, checkLoggedIn } = useContext(AuthContext)
    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            })
            console.log("loggedIn", loggedIn)
        }
    }, [inView, animation])
    const messageVariants = {
        hidden: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: transition },
    }
    const formData = [
        {
            value: userNameEmail,
            onChange: (e) => setUsernameEmail(e.target.value),
            type: 'text',
            placeHolder: 'Enter your username/email',
            label: 'Username/Email'
        },
        {
            value: password,
            onChange: (e) => setPassword(e.target.value),
            type: 'password',
            placeHolder: 'Enter your password',
            label: 'Password'
        }
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userNameEmail && password) {
            backend
                .login(
                    {
                        "emailOrUsername": userNameEmail,
                        "password": password
                    }
                )
                .then(response => {
                    setUsernameEmail('')
                    setPassword('')
                    setError(null)
                    setSuccess('Login successfully done!')
                    console.log("response", response)
                    setCookie("LaFrenchTechToken", response.data.token, 60)
                    let intervalLogin = setInterval(() => {
                        setSuccess(null)
                        checkLoggedIn()
                        navigate('/adminPanel')
                        clearInterval(intervalLogin)
                    }, 3000)
                })
                .catch(error => setError(error.response.data.error))
        }
        else
            setError('Fill the data')
    }
    return (

        <>
            {
                !loggedIn
                    ?
                    <LoginSection>
                        < RowForm ref={ref} variants={messageVariants} >
                            <ColumnForm>
                                <FormTitle
                                    color={darkGray}
                                    mb={'24px'}
                                    fontSize={'48px'}
                                    fontWeight={'600'}
                                >Log In</FormTitle>
                                <FormWrapper onSubmit={handleSubmit}
                                    initial={initial}
                                    transition={{ delay: 0.8, duration: 0.9 }}
                                    animate={animation}
                                >
                                    {formData.map((el, index) => (
                                        <FormInputRow key={index}
                                            initial={initial}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                            animate={animation}
                                        >
                                            <FormLabel>{el.label}</FormLabel>
                                            <FormInput
                                                type={el.type}
                                                placeholder={el.placeHolder}
                                                value={el.value}
                                                onChange={el.onChange}
                                            />
                                        </FormInputRow>
                                    ))}
                                    <RowForm>
                                        {
                                            !success ? <FormButton type="submit" inverse={false}>Login</FormButton> : ''
                                        }
                                    </RowForm>

                                </FormWrapper>
                            </ColumnForm>
                        </RowForm >
                        <RowForm>
                            {error && (
                                <FormMessage
                                    variants={messageVariants}
                                    initial="hidden"
                                    animate="animate"
                                    error
                                >
                                    {error}
                                </FormMessage>
                            )}
                            {success && (
                                <FormMessage variants={messageVariants} initial="hidden" animate="animate">
                                    <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                                    <br></br>
                                    {success}
                                </FormMessage>
                            )}
                        </RowForm>
                    </LoginSection >
                    : navigate('/adminPanel')
            }
        </>

    )
}

export default Login