import React, { useEffect, useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const TextEditorBlock = ({ description, setDescription }) => {
    let _contentState = ContentState.createFromText(description);
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    //() => EditorState.createEmpty(),

    useEffect(() => {
        console.log("description in texteditor", description)
        ///setEditorState(createMarkup(description))
    }, [])

    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        //  console.log("currentContentAsHTML", currentContentAsHTML)
        setConvertedContent(currentContentAsHTML);
        setDescription(currentContentAsHTML)
    }
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                {/* {editorState} */}
            </header>
            <Editor
                defaultContentState={contentState}
                onContentStateChange={setContentState}
                // editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <h3><u>Text To be on the user interface</u></h3>
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
        </div>
    )
}
export default TextEditorBlock;