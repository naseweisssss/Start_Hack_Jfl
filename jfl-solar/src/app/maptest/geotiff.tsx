import GeoTIFF, {
    fromUrl,
    fromUrls,
    fromArrayBuffer,
    fromBlob,
    GeoTIFFImage,
} from "geotiff";
import { useEffect } from "react";
import proj4 from "proj4";
import {toProj4} from "geotiff-geokeys-to-proj4";

interface coord {
    coord: {
        lat: number | null;
        lng: number | null;
    };
}

const GTF: React.FC<coord> = ({ coord }) => {
    let gimage: GeoTIFFImage;

    useEffect(() => {
        console.log("here");
        let projection: any;
        const load = async () => {
            const gtiff = await fromUrl("/switzerland/GHI.tif", {
                normalize: false,
            });
            // const gtiff = await fromUrl("Copernicus_DSM_30_N03_00_E016_00_DEM.tif")
            gimage = await gtiff.getImage();
            
            // console.log(data)
            const geoKeys = await gimage.getGeoKeys();
            const projObj = toProj4(geoKeys);
            projection = proj4(`WGS84`, projObj.proj4);
            // console.log(projection);
        };

        load().then(async ()=>{
            if (coord.lat !== null && coord.lng !== null) {
                const { x, y } = projection.forward({
                    x: coord.lat,
                    y: coord.lng,
                });
                // console.log(x)
                const width = gimage.getWidth();
                const height = gimage.getHeight();
                const [originX, originY] = gimage.getOrigin();
                // console.log(originY)
                const [xSize, ySize] = gimage.getResolution();
                // console.log(xSize)
                // console.log(gimage.getWidth())
                const uWidth = xSize * width;
                console.log(uWidth)
                const uHeight = ySize * height;
                const percentX = (x - originX) / uWidth;
                console.log(percentX)
                const percentY = (y - originY) / uHeight;
    
                const pixelX = Math.floor(width * percentX / 100);
                const pixelY = Math.floor(height * percentY / 100);
                console.log(pixelX);
                // console.log(gimage.getGDALNoData());
                // console.log(pixelY)
                // await gimage.readRasters( {
                //     interleave: true,
                // } ).then((data)=>{
                //     console.log(data)
                //     let value = data[ width * pixelY + pixelX ];
                //     console.log(value)
                // })
                const data = gimage.readRasters( {
                    // interleave: true,
                    // resampleMethod: 'bilinear' 
                    // window: [ pixelX, pixelY, pixelX + 1, pixelY + 1],
                } );
                console.log(await data)
                
            }

        });

     
        
    }, [coord]);

    // useEffect(() => {
    //     // console.log(coord)
    //     if (coord.lat !== null && coord.lng !== null) {
    //         const { x, y } = projection.forward({
    //             x: coord.lat,
    //             y: coord.lng,
    //         });
    //         const width = gimage.getWidth();
    //         const height = gimage.getHeight();
    //         const [originX, originY] = gimage.getOrigin();
    //         const [xSize, ySize] = gimage.getResolution();
    //         const uWidth = xSize * width;
    //         const uHeight = ySize * height;
    //         const percentX = (x - originX) / uWidth;
    //         const percentY = (y - originY) / uHeight;

    //         const pixelX = Math.floor(width * percentX);
    //         const pixelY = Math.floor(height * percentY);
    //         gimage.readRasters( {
    //             interleave: true,
    //             samples: [ 0 ]
    //         } ).then((data)=>{
    //             let value = data[ width * pixelY + pixelX ];
    //             console.log(value)
    //         })
            
    //     }
    // }, [coord]);

    return <></>;
};

export default GTF;
