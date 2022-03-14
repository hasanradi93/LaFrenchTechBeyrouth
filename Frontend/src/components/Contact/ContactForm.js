import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { darkGray, lightGray } from '../../services/colors'
import {
    ContactFormSection
    , ColumnForm
    , RowForm
    , FormTitle
    , FormWrapper
    , FormInputRow
    , FormInput
    , FormSelect
    , FormOption
    , FormTextarea
    , FormLabel
    , FormButton
    , FormMessage
} from './ContactStyles'
import validateForm from './ValidateForm'
import backend from '../../services/ConnectWithBackend'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ContactForm = () => {
    const { t } = useTranslation()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const initial = { opacity: 0, y: 30 };
    const transition = { delay: 0.3, duration: 0.6 };
    const animation = useAnimation();

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation])
    const messageVariants = {
        hidden: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: transition },
    }
    const formData = [
        {
            value: firstName,
            onChange: (e) => setFirstName(e.target.value),
            type: 'text'
        },
        {
            value: lastName,
            onChange: (e) => setLastName(e.target.value),
            type: 'text'
        },
        {
            value: companyName,
            onChange: (e) => setCompanyName(e.target.value),
            type: 'text',
        },
        {
            value: email,
            onChange: (e) => setEmail(e.target.value),
            type: 'email'
        },
        {
            value: subject,
            onChange: (e) => setSubject(e.target.value),
            type: 'select',
        },
        {
            value: message,
            onChange: (e) => setMessage(e.target.value),
            type: 'textarea',
        }
    ]
    const dataLabels = t('Contact.labelsForm', { returnObjects: true })
    const dataSelect = t('Contact.subjectForm', { returnObjects: true })
    const handleSubmit = (e) => {
        e.preventDefault();
        const resultError = validateForm({ firstName, lastName, email, subject, message });

        if (resultError !== null) {
            setError(t(`Contact.formMessages.error_${resultError}`))
            return
        }
        backend
            .contact(
                {
                    "fName": firstName,
                    "lName": lastName,
                    "companyName": companyName ? companyName : 'NAN',
                    "subject": subject,
                    "email": email,
                    "message": message
                }
            )
            .then(response => {
                setFirstName('')
                setLastName('')
                setCompanyName('')
                setEmail('')
                setSubject('')
                setMessage('')
                setError(null)
                setSuccess(t('Contact.formMessages.success'))
            })
            .catch(error => setError(error.response.data.error))
    }
    return (
        <ContactFormSection
            ref={ref}
            initial={initial}
            transition={{ delay: 0.5, duration: 0.6 }}
            animate={animation}
        >
            <RowForm>
                <ColumnForm>
                    <FormTitle
                        color={darkGray}
                        mb={'24px'}
                        fontSize={'48px'}
                        fontWeight={'600'}
                    >Contact us</FormTitle>
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
                                <FormLabel>{dataLabels[index].labelName}</FormLabel>
                                {el.type === "select"
                                    ? <FormSelect type={el.type} onChange={el.onChange}>
                                        <FormOption key={-1} value={0} color={lightGray}>
                                            {t('Contact.subjsctFormFirst')}
                                        </FormOption>
                                        {
                                            dataSelect.map((subject, i) => (
                                                <FormOption key={i} value={subject}>
                                                    {subject}
                                                </FormOption>
                                            ))
                                        }
                                    </FormSelect>
                                    : (
                                        el.type === "textarea"
                                            ? <FormTextarea type={el.type} value={el.value} onChange={el.onChange} placeholder={dataLabels[index].placeHolder} />
                                            : <FormInput
                                                type={el.type}
                                                placeholder={dataLabels[index].placeHolder}
                                                value={el.value}
                                                onChange={el.onChange}
                                            />
                                    )
                                }
                            </FormInputRow>
                        ))}
                        <FormButton type="submit" inverse={false}>{t('Contact.btnFormLabel')}</FormButton>

                    </FormWrapper>

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
                            {success}
                        </FormMessage>
                    )}
                </ColumnForm>
            </RowForm>
        </ContactFormSection>
    )
}

export default ContactForm