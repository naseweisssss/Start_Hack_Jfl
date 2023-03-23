import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import { useEffect } from 'react';

export default function GTF() {

    useEffect(()=>{
        console.log("here")
        const load = async () => {
            const gtiff = await fromUrl("/switzerland/DIF.tif");
            const gimage = await gtiff.getImage();
            console.log(gimage.getWidth);
        }

        load();
        
    }, [])
    

    return <></>
    
}