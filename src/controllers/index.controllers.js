import Family from '../models/Family';

export const renderIndex = async (req, res) => {
  console.log(req.user.id);
  const families = await Family.find({id_User: req.user.id}).sort({createdAt: -1});
  res.render("index", {families, PageTitle: 'Inicio'});
};