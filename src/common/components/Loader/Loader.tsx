import React, { useEffect, useState } from 'react';
import { IonProgressBar } from '@ionic/react';

export const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 0.01);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    if (progress > 1) {
        setTimeout(() => {
            setProgress(0);
        }, 1000);
    }

    return <IonProgressBar style={{position: 'fixed', top: 70}} value={progress}></IonProgressBar>;
}