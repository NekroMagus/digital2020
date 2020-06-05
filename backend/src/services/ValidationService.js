import ErrorHandler from "../helper/ErrorHandler";

class ValidationService {

  static isAllUserProfileCompleted(profile) {
    return profile.city !== null
        && profile.patronymic !== null
        && profile.gender !== null
        && profile.information !== null
        && profile.description !== null
        && profile.projectDescription !== null
        && profile.interests !== null
        && profile.zipCode !== null
        && profile.areaCity !== null
        && profile.areaRegion !== null
        && profile.street !== null
        && profile.socialPosition !== null
        && profile.phone !== null;
  }

  static isBodyFieldEmpty(data, name = null) {
    if (!data) {
      throw new ErrorHandler(500, `${name} in body is required`);
    }
  }

  static isQueryFieldEmpty(data, name = null) {
    if (!data) {
      throw new ErrorHandler(500, `${name} in query is required`);
    }
  }

  static isNotExists(data, name = null) {
    if (!data) {
      throw new ErrorHandler(500, `${name} is not exists`);
    }
  }

}

export default ValidationService;