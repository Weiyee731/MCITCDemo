// react
import React from 'react';

export default function BlockMap() {
    return (
        <div className="block-map block" >
            <div className="container">
                <div className="block-map__body">
                    <iframe
                        title="Google Map"
                        src="https://maps.google.com/maps?q=Penview%20Convention%20Center%20Kuching&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                    />
                </div>
            </div>
        </div>

        
    );
}
