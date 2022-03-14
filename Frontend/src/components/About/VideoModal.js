import React from 'react'
import { VideoSection, ModalVideo } from './AboutStyles'
import ReactPlayer from "react-player"

const videoModal = ({ data }) => {
    return (
        <VideoSection>
            <ModalVideo>
                <ReactPlayer width="100%" height="100%"
                    url={data}
                />
            </ModalVideo>
        </VideoSection>
    )
}

export default videoModal