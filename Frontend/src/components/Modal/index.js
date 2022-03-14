import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
    Background,
    CloseModalButton,
    ModalWrapper,
    ImgLoading
} from './ModalStyles'
import EventModal from '../Events/EventModal'
import VideoModal from '../About/VideoModal'
import ContactForm from '../Contact/ContactForm'
import EventModalAdmin from '../Admin/Events/EventModalAdmin'

const Modal = ({ showModal, toggleModal, openedBy, pageName, data }) => {
    const modalRef = useRef()
    const [loading, setLoading] = useState(true)
    const closeModal = (e) => {
        if (modalRef.current === e.target)
            toggleModal()
    }

    const KeyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal)
                toggleModal()
        },
        [showModal, toggleModal]
    )

    useEffect(() => {
        if (showModal)
            loadingNow()
        else
            setLoading(true)
        document.addEventListener('keydown', KeyPress)
        return () => document.removeEventListener('keydown', KeyPress)
    }, [KeyPress])

    const loadingNow = () => {
        let intervalLoad = setInterval(() => {
            setLoading(false)
            clearInterval(intervalLoad)
        }, 2000)
    }

    const backgroundVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1,
            },
        }
    }

    const modalVariants = {
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.5,
                type: 'spring',
                stiffness: 100,
            },
        }
    }

    return (
        <AnimatePresence>
            {showModal && (
                <Background
                    variants={backgroundVariants}
                    animate="animate"
                    initial="initial"
                    onClick={closeModal}
                    ref={modalRef}
                    exit={{ opacity: 0, }}
                >
                    <ModalWrapper
                        variants={modalVariants}
                        animate="animate"
                        initial="initial"
                        exit={{ opacity: 0, y: '-100vh' }}>

                        {loading
                            ? <ImgLoading src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} />
                            : (openedBy === "Event"
                                ? <EventModal data={data} pageName={pageName} />
                                : (openedBy === "Contact"
                                    ? <ContactForm />
                                    : (
                                        openedBy === "EventAdmin"
                                            ? (<EventModalAdmin data={data} handleAction={pageName} />)
                                            : (<VideoModal data={data} pageName={pageName}></VideoModal>)
                                    )
                                )
                            )
                        }

                        <CloseModalButton area-lable="Close modal" onClick={toggleModal} />
                    </ModalWrapper>

                </Background>
            )}
        </AnimatePresence>
    )
}

export default Modal