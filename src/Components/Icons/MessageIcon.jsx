import React from "react";

const MessageIcon = (props) => {
    const { fill } = props;
    return (
        <svg
            fill={fill}
            height="24px"
            width="24px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 458 458" xmlSpace="preserve">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g> <g>
                <path d="M428,41.534H30c-16.568,0-30,13.432-30,30v252c0,16.568,13.432,30,30,30h132.1l43.942,52.243 c5.7,6.777,14.103,10.69,22.959,10.69c8.856,0,17.259-3.912,22.959-10.689l43.942-52.243H428c16.569,0,30-13.432,30-30v-252 C458,54.965,444.569,41.534,428,41.534z M85.402,127h137c8.284,0,15,6.716,15,15s-6.716,15-15,15h-137c-8.284,0-15-6.716-15-15 S77.118,127,85.402,127z M372,249H86c-8.284,0-15-6.716-15-15s6.716-15,15-15h286c8.284,0,15,6.716,15,15S380.284,249,372,249z"></path>
            </g> </g> </g>
        </svg>
    );
};

export default MessageIcon;
