import React from "react";
import Email from "./Email/Email";

const StepEmail = ({ onNext }) => {
    const Component = Email;
    return (
        <div>
            <Component onNext={onNext} />
        </div>
    )
}

export default StepEmail;