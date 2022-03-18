import React, { useEffect, useState } from 'react'
import {
    SeePhotosViewSection,
    ThePhotoCadre,
    DeleteBtnPhoto,
    ThePhoto,
    MessagePhoto
} from './EventsStyles'
import { FaTrash } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'

const SeePhotosView = ({ photos, id }) => {
    const [photosToDelete, setPhotoToDelete] = useState([])
    const [message, setMessage] = useState()
    const iconStyle = (Icon) => <Icon />
    const deleteThePhoto = img => {
        if (window.confirm('do you want to dlete this photo?')) {
            console.log("img to delete ", img)
            console.log("id event", id)
            backend
                .deletePhotoEvent('LaFrenchTechToken', { 'photo': img }, id)
                .then(response => {
                    setMessage("Photo deleted successfully")
                    let newArrPhotos = photosToDelete.filter(ph => (ph !== img))
                    setPhotoToDelete(newArrPhotos)
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                })
            let intervalData = setInterval(() => {
                setMessage(undefined)
                clearInterval(intervalData)
            }, 5000)
        }
    }
    useEffect(() => {
        setPhotoToDelete(photos)
    }, [])
    return (
        <SeePhotosViewSection>
            <>
                {
                    message !== undefined
                        ? <MessagePhoto>{message}</MessagePhoto>
                        : ''
                }
            </>
            <>
                {
                    photosToDelete.length
                        ? photosToDelete.map((img, i) => (
                            <ThePhotoCadre>
                                <DeleteBtnPhoto onClick={() => deleteThePhoto(img)}>
                                    {iconStyle(FaTrash)}
                                </DeleteBtnPhoto>
                                <ThePhoto src={img} />
                            </ThePhotoCadre>
                        ))
                        : 'Loading photos..'
                }
            </>
        </SeePhotosViewSection>
    )
}

export default SeePhotosView