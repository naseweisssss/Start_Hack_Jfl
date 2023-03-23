import GeoTIFF, {
    fromUrl,
    fromUrls,
    fromArrayBuffer,
    fromBlob,
    GeoTIFFImage,
} from "geotiff";
import { useEffect } from "react";
import proj4 from "proj4";
import * as geokeysToProj4 from "geotiff-geokeys-to-proj4";

interface coord {
    coord: {
        lat: number | null;
        lng: number | null;
    };
}

const GTF: React.FC<coord> = ({ coord }) => {
    let gimage: GeoTIFFImage;
    let projection: proj4.Converter;

    useEffect(() => {
        console.log("here");
        const load = async () => {
            const gtiff = await fromUrl("/switzerland/DIF.tif");
            gimage = await gtiff.getImage();
            const geoKeys = gimage.getGeoKeys();
            const projObj = geokeysToProj4.toProj4(geoKeys);
            projection = proj4(`WGS84`, projObj.proj4);
            console.log(projection);
        };

        load();
    }, []);

    useEffect(() => {
        // console.log(coord)
        if (coord.lat !== null && coord.lng !== null) {
            const { x, y } = projection.forward({
                x: coord.lat,
                y: coord.lng,
            });
            const width = gimage.getWidth();
            const height = gimage.getHeight();
            const [originX, originY] = gimage.getOrigin();
            const [xSize, ySize] = gimage.getResolution();
            const uWidth = xSize * width;
            const uHeight = ySize * height;
            const percentX = (x - originX) / uWidth;
            const percentY = (y - originY) / uHeight;

            const pixelX = Math.floor(width * percentX);
            const pixelY = Math.floor(height * percentY);
            gimage.readRasters( {
                interleave: true,
                samples: [ 0 ]
            } ).then((data)=>{
                let value = data[ width * pixelY + pixelX ];
                console.log(value)
            })
            
        }
    }, [coord]);

    return <></>;
};

export default GTF;
