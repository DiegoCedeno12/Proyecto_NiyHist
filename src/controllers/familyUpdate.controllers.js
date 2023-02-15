import path from 'path';
import { randomNumber } from '../helpers/libs';
import fs from 'fs-extra';
import pdf from 'pdfkit';

import Family from '../models/Family';
import User from '../models/User';

export const renderFamilyUpdate = async (req, res) => {
    const familiars = await Family.findOne({ _id: req.params.id })
    res.render('familyUpdate', { familiars, PageTitle: 'Modificar Familiar' });
}

export const familyUpdate = async (req, res) => {
    const { identify, first_name, last_name, birth_date, age, email, address, latitude, length, blood_type, disability, allergies, medices } = req.body;
    if (req.file) {
        const family = await Family.findOne({ _id: req.params.id });
        if (family) {
            await fs.unlink(path.resolve('./src/public/upload/' + family.image));
            const saveImage = async () => {
                const imagUrl = randomNumber();
                console.log(imagUrl);
                const images = await Family.find({ image: imagUrl });
                if (images.length > 0) {
                    saveImage();
                } else {
                    try {
                        const imageTempPath = req.file.path //carpeta temporal donde se encuentra
                        console.log(req.file.originalname);
                        const ext = path.extname(req.file.originalname).toLocaleLowerCase(); // el tipo de formato del archivo
                        console.log(imageTempPath + ext)
                        const targetPath = path.resolve(`src/public/upload/${imagUrl}${ext}`)
                        if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
                            await fs.rename(imageTempPath, targetPath);//
                            await Family.findByIdAndUpdate(req.params.id, {
                                identify, first_name, last_name, birth_date, age, email,
                                address, latitude, length, blood_type, disability, allergies, medices,
                                image: imagUrl + ext
                            })
                            req.flash('success_msg', `Se modificó el familiar ${req.body.first_name.toUpperCase()} ${req.body.last_name.toUpperCase()}`);
                            res.redirect('/family')
                        } else {
                            await fs.unlink(imageTempPath);
                        }
                    } catch (error) {
                        res.status(500).json({
                            message: 'El archivo que desea guardar no es una imagen', error,
                        })
                    }

                };
            };
            saveImage();
        }
    } else {
        await Family.findByIdAndUpdate(req.params.id, {
            identify, first_name, last_name, birth_date, age, email,
            address, latitude, length, blood_type, disability, allergies, medices
        })
        req.flash('success_msg', `Se modificó el familiar ${req.body.first_name.toUpperCase()} ${req.body.last_name.toUpperCase()}`);
        res.redirect('/family')
    }
}