import Family from '../models/Family';
import Missing from '../models/Missing';

export const renderMissing = async (req, res) => {
  const familiares = await Family.find().sort({ createdAt: -1 });
  const desaparecidos = await Missing.find().sort({ createdAt: -1 });
  res.render("missing", {familiares, desaparecidos, PageTitle: 'Familiares Desaparecidos' });
};

export const rendermissingAdd = async (req, res) => {
  const missingFamily = await Family.findOne({ _id: req.params.id })
  const desaparecidos = await Missing.findOne({ id_Family: req.params.id });
  res.render("missingAdd", { missingFamily, desaparecidos, PageTitle: 'Reportar Familiar' });
};

export const missingUpdate = async (req, res) => {
  const { sex, nationality, height, eyeColor, hairColor,  skinColor, shirt, shoes, pants, found  } = req.body;
  console.log(found);
  if( found == 'on' ){
    await Missing.findByIdAndUpdate( req.params.id, { sex, nationality, height, eyeColor, hairColor,  skinColor, shirt, shoes, pants, found: true})
  } else {
    await Missing.findByIdAndUpdate( req.params.id, { sex, nationality, height, eyeColor, hairColor,  skinColor, shirt, shoes, pants, found: false})
  }
  
  req.flash('success_msg', `Se Actualizó el familiar a Desaparecidos`);
  res.redirect('/family')
}

export const missingAdd = async (req, res) => {
  const newMissing = new Missing({
    id_Family: req.params.id,
    reportedDate: req.body.dateNow,
    timeNow: req.body.timeNow,
    sex: req.body.sex,
    nationality: req.body.nationality,
    height: req.body.height,
    eyeColor: req.body.eyeColor,
    hairColor: req.body.hairColor,
    skinColor: req.body.skinColor,
    shirt: req.body.shirt,
    shoes: req.body.shoes,
    pants: req.body.pants
  });
  const missingSaved = await newMissing.save();
  req.flash('success_msg', `Se agregó el familiar a Desaparecidos`);
  res.redirect('/family')
};
