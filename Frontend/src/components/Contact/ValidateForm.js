export default function validateForm({ firstName, lastName, email, subject, message }) {
    if (!firstName.trim())
        return 1
    // else if (!/^[A-Za-z]+/.test(name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
    if (firstName.length < 3)
        return 2
    if (firstName.length > 30)
        return 3
    if (!isNaN(Number(firstName)))
        return 4
    if (!lastName.trim())
        return 5
    if (lastName.length < 3)
        return 6
    if (lastName.length > 30)
        return 7
    if (!isNaN(Number(lastName)))
        return 8
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email)
        return 9
    else if (regex.test(email.toLocalLowerCase))
        return 10;
    if (!subject)
        return 11
    if (!message.trim())
        return 12
    if (message.length < 20)
        return 13
    if (!isNaN(Number(message)))
        return 14
    // if (!password) {
    // 	return 'Password is required';
    // } else if (password.length < 6) {
    // 	return 'Password needs to be 6 characters or more';
    // }

    // if (!confirmPass) {
    // 	return 'Enter Confirm password is required';
    // } else if (confirmPass !== password) {
    // 	return 'Passwords do not match';
    // }
    return null;
}
