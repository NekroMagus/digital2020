import UserService from "../services/UserService";

const updateUserRating = async (req, res, next) => {
  const points = req.user.points;
  if ((points > 1000 && points < 5000) && req.user.rating !== 'Лидер мнений') {
    await UserService.update(req.user.id, {rating: 'Лидер мнений'});
  } else if (points > 5000 && req.user.rating !== 'Амбассадор') {
    await UserService.update(req.user.id, {rating: 'Амбассадор'});
  }
  next();
};


export default updateUserRating;