import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Carbon
import {
    Button,
    Form,
    TextInput,
    Row,
    Column,
    InlineNotification,
    Link
} from 'carbon-components-react';
import {
    ArrowRight16
} from '@carbon/icons-react';

function LoginPage(props) {
    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        if(props.loginStatus) {
            props.history.push('/dashboard');
        }
    }, [props.loginStatus]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let valid;
        /*
            DRY
            Below code needs work!
        */
        if(username == '') {
            valid = false;
            setUsernameError('Username is required.');
        } else {
            valid = true;
            setUsernameError(undefined);
        }
        if(password == '') {
            valid = false;
            setPasswordError('Password is required.');
        } else {
            valid = true;
            setPasswordError('');
        }
        // Axios
        if(login && valid) {
            axios.post('/api/login', {username, password})
            .then((response) => {
                // redirect to '/'
                props.setLoginStatus(true);
                props.history.push('/dashboard');
            })
            .catch((error) => {
                console.log(error);
            });
        } else if(!login && valid) {
            axios.post('/api/register', {username, password})
            .then((response) => {
                setLogin(true);
                setRegisterSuccess(true);
                // Switch to login + notify success!
            })
            .catch((error) => {
                console.log(error);
                // Show errors
            });
        }
    }

    return (
        <Row>
            <Column sm={4} md={4} lg={6}>
                <Form className="entry-page__form" onSubmit={handleSubmit}>
                    <div className="entry-page__title">
                        <h1>{login ? 'Login' : 'Register'}</h1>
                        <br />
                        {login ? (
                            <p> Don't have an account? <Link href="#" style={{fontSize:'1rem'}} inline onClick={() => setLogin(!login)}>Create one</Link>.</p>
                        ) : (
                            <p> Or <Link href="#" style={{fontSize:'1rem'}} inline onClick={() => setLogin(!login)}>login</Link>.</p>
                        )}
                    </div>
                    <hr/>
                    <br/>
                    {registerSuccess
                        ? <InlineNotification kind="success" title="Registration successful!" subtitle="Login to continue." lowContrast />
                        : <React.Fragment />
                    }
                    <div className="entry-page__input">
                        <TextInput
                            id="username"
                            labelText="Enter your details"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            invalidText={usernameError}
                            invalid={usernameError ? true : false}
                        />
                    </div>
                    <div className="entry-page__input">
                        <TextInput.PasswordInput
                            hidePasswordLabel="Hide password"
                            id="password"
                            labelText=""
                            placeholder="Password"
                            showPasswordLabel="Show password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            invalidText={passwordError}
                            invalid={passwordError ? true : false}
                        />
                    </div>
                    <div>
                        <Button
                            style={{width: '100%'}}
                            kind="primary"
                            type="submit"
                            renderIcon={ArrowRight16}
                        >
                            {login ? 'Login' : 'Register'}
                        </Button>
                    </div>
                    <hr/>
                    <p> Made by <Link href="https://evanmachale.dev/" style={{fontSize:'1rem'}} inline>Evan</Link>.</p>
                </Form>
            </Column>
            <Column sm={0} md={4} lg={12} />
        </Row>
    );
}

export default LoginPage;