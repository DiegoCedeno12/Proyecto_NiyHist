import path from 'path';
import { randomNumber } from '../helpers/libs';
import fs from 'fs-extra';
import pdf from 'pdfkit-construct';
import fsa from "fs";
import Family from '../models/Family';
import User from '../models/User';

export const renderFamilyADD = (req, res) => {
    res.render("familyAdd", { PageTitle: 'Agregar Familiar' });
};

export const familyAdd = (req, res) => {
    const saveImage = async () => {
        const imagUrl = randomNumber();
        const images = await Family.find({ image: imagUrl });
        if (images.length > 0) {
            saveImage();
        } else {
            try {
                console.log(imagUrl);
                const imageTempPath = req.file.path //carpeta temporal donde se encuentra
                console.log(imageTempPath);
                const ext = path.extname(req.file.originalname).toLocaleLowerCase(); // el tipo de formato del archivo
                const targetPath = path.resolve(`src/public/upload/${imagUrl}${ext}`)
                if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
                    await fs.rename(imageTempPath, targetPath);//
                    let newFamily = new Family({
                        id_User: req.user.id,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        image: imagUrl + ext,
                        identify: req.body.identify,
                        birth_date: req.body.birth_date,
                        age: req.body.age,
                        email: req.body.email,
                        address: req.body.address,
                        latitude: req.body.latitude,
                        longitud: req.body.longitud,
                        disability: req.body.disability,
                        blood_type: req.body.blood_type,
                        allergies: req.body.allergies,
                        medices: req.body.medices
                    });
                    console.log(req.body)
                    const familySaved = await newFamily.save();
                    console.log(familySaved);
                    req.flash('success_msg', `Se agregó ${req.body.first_name.toUpperCase()} ${req.body.last_name.toUpperCase()} como nuevo familiar`);
                    res.redirect('/family')
                } else {
                    await fs.unlink(imageTempPath);
                    res.json({
                        error: "El archivo que desea guardar no es una imagen"
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: 'El archivo que desea guardar no es una imagen', error,
                })
            }
        }
    };
    saveImage();
}

export const renderFamily = async (req, res) => {
    const familiares = await Family.find({ id_User: req.user.id }).sort({ createdAt: -1 });
    res.render('family', { familiares, PageTitle: 'Familias' });
};

export const renderFamilyQr = async (req, res) => {
    const family = await Family.findOne({ _id: req.params.id })
    const userFamily = await User.findOne({ _id: family.id_User })
    console.log(family)
    res.render("templates", { family, userFamily })
}


export const familiyDelete = async (req, res) => {
    const family = await Family.findOne({ _id: req.params.id });
    if (family) {
        await fs.unlink(path.resolve('./src/public/upload/' + family.image));
        await family.remove();
        req.flash('success_msg', `Se eliminó el familiar ${family.first_name.toUpperCase()} ${family.last_name.toUpperCase()}`);
        res.redirect('/family');
    }
}

export const familyQr = async (res, req) => {
    const family = Family.findOne({ _id: req.params.id });
    console.log(family);

}
