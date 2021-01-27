## Stores Login component states

-----Login-----

## Javascript(req)

const formStates = useFormStates() -- get the states

const HandleLogin = () => {
-----if (formStates.Submit()) {
-----console.log('good to go'); -- info is good, do what you want
-----formStates.setBtnLoading(true); -- disables the login button
} else {
-----console.log('bad info'); -- info is bad
}
};

## Props(req)

formStates={formStates} -- pass to login component
handleSubmit={HandleLogin} -- pass a handler function to component's button

## Props(opt)

maxWidth -- container prop

If you want "Have an account?" link

linkText={linkText.login} -- pass link text ex."Don't have an account? Sign Up. "
linkComponent={RouterLink} -- if you are working with react router, import the Link component as RouterLink and pass it
linkTo="/signup" -- pass the route you want to redirect with the link

-----SignUp-----

## Javascript(req)

const formStates = useFormStates() -- get the states

const HandleSignUp = () => {
-----if (formStates.Submit("signUp")) { -- give it the signUp type to activate confirm password validation
-----console.log('good to go'); -- info is good, do what you want
-----formStates.setBtnLoading(true); -- disables the sign up button
} else {
-----console.log('bad info'); -- info is bad
}
};

## Javascript(opt)

If you want more fields, you can add as children OR

const [name, setName] = useState(''); -- set states for additional fields
const [surname, setSurname] = useState('');

const [errName, setErrName] = useState(''); -- set error text states for additional fields
const [errSurname, setErrSurname] = useState(''); -- (you have to do the validation yourself)

const fields = [
{
------label: 'Name',
------state: name, -- these have to match with the state variables
------setState: setName,
},
{
------label: 'Surname',
------state: surname,
------setState: setSurname,
},
];

## Props(req)

formStates={formStates} -- pass to sign up component
handleSubmit={HandleSignUp} -- pass a handler function to component's button

## Props(opt)

maxWidth -- container prop

If you want "Have an account?" link

linkText={linkText.signUp} -- pass link text ex."Have an account? Login. "
linkComponent={RouterLink} -- if you are working with react router, import the Link component as RouterLink and pass it
linkTo="/login" -- pass the route you want to redirect with the link
