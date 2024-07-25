import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from 'uuid';

const UploadImage = expressAsyncHandler(async (req, res, next) => {
    try {
      console.info(req.files)
        //directory name by req.url
        var allDirName = {
            "create-workspace": "./public/work-space-name/",
            "workspace-update": "./public/work-space-name/",
            "profile": "./public/profile/"

        }

        var reqUrlArr = req.url.split("/")
        var lastword = reqUrlArr[reqUrlArr.length - 1]
        var dirName = allDirName[lastword]

        if (req.files) {
            const { image } = req.files
            if (image.size > 1 * 1024 * 1024) {
                throw new Error('File size exceeds the maximum limit of 1MB.');
            }


            // const imagePath = dirName+image.name
            const imageName = uuidv4()

            const imagePath = `${dirName}${imageName}.png`

            image.mv(imagePath, function (err) {
                if (err) {
                    console.log(err)
                    throw new Error(err)
                };
                req.locals = {

                    image: process.env.SERVER_URL + imagePath,
                    path: imagePath
                }

                next()
            });
        }

        else {
            next()
        }

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
})



export {
    UploadImage,

}