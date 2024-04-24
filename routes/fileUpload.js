const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const libs = require('../lib');

const fileUploadPath  = path.join(__dirname, '../Public/uploads');

if(!fs.existsSync(fileUploadPath)) {
    fs.mkdirSync(fileUploadPath);
}

const middlewares = require('../middlewares');


router.post('/uploadFileMultipart', middlewares.session.checkLogin(true),(req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fileUploadPath)
        },
        filename: (req, file , callback) => {
            const extenion = path.extname(file.originalname);
            const fileName = `${Date.now()}-${crypto.randomBytes(10).toString('hex')}-${req.session.userId}${extenion}`;
            callback(null, fileName);
        }
    })
    const uploader = multer({
        storage: storage,
        limits: {
            fileSize: 50 * 1024 * 1024,
        }
    }).any()
    uploader(req, res, (err) => {
        if (err != null) {
            console.log(err);
            return res.status(500).json({error: err?.message ?? err})
        }
        next();
    });
}, (req, res) => {
    try {
        const baseUrl = `${libs.utils.hostUrl()}/uploads`
        const urls = [];
        if (req.files?.length) {
            req.files.forEach((element) => {
                urls.push(`${baseUrl}/${element.filename}`);
            })
        }
        if (req.file) {
            const fileUrl = urls.push(`${baseUrl}/${req.file.filename}`);
            urls.push(fileUrl);
        }
        if (urls.length < 2) {
            return res.json({url: urls?.[0]});
        }
        return res.json({urls: urls});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error?.message});
    }
})

module.exports = router;