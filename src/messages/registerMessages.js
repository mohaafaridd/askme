export class RegistrationMessages {
  static minLength(limit) {
    return `Minimum length is ${limit}`;
  }

  static maxLength(limit) {
    return `Maximum length is ${limit}`;
  }

  static caseMatch(field) {
    switch (field) {
      case 'firstname':
      case 'middlename':
        return `${field} can contain only characters`;

      case 'username':
        return `${field} can contain only characters, dots and hyphens`;

      default:
        return null;
    }
  }
}
