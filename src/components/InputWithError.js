import React from 'react';

const InputWithError = ({error, classname = '', input}) => {

    return(
        <div className={(error ? 'error ' : '') + classname}>
            {input}
            {error && 
                <div>
                    {error}
                </div>
            }
        </div>
    )
}

export default InputWithError