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

}

export default ValidationService;