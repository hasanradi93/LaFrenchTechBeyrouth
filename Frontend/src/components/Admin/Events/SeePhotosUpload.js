import React from 'react'
import {
    InputBox,
    SeePhotosUploadSection,
    TheuploadCadre,
} from './EventsStyles'

const SeePhotosUpload = ({ newPhotosFiles }) => {

    return (
        <SeePhotosUploadSection>
            <TheuploadCadre>
                <InputBox type="file" name='photos' multiple onChange={(e) => newPhotosFiles(e.target.files)} />
            </TheuploadCadre>
        </SeePhotosUploadSection>
    )
}

export default SeePhotosUpload