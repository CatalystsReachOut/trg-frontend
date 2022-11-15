import React from 'react'
import { FiUpload } from 'react-icons/fi'

const Upload = ({key, content, className}) => {
    return (
        <div>
            <div className="flex justify-center items-center w-full">
                <label
                    htmlFor={`dropzone-file-${key}`}
                    className={`flex flex-col justify-center items-center w-full h-50 bg-gray-50 rounded-lg border-2 border-secondary border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 px-2 ${className}`}
                >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <FiUpload className='text-2xl text-secondary'/>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{content}</span>
                        </p>
                    </div>
                    <input id={`dropzone-file-${key}`} type="file" className="hidden" />
                </label>
            </div>

        </div>
    )
}

Upload.defaultProps = {
    content:'Click to upload or drag and drop'
}

export default Upload