import * as yup from 'yup';

export const schema = yup.object({
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
  AddressLineOne: yup.string().required(),
  EmailAddressOne: yup.string().required(),
  PhoneNumberOne: yup.string().required(),
  //TaxRegistrationNumber: yup.string().required(),
  //DriversLicenseFileId: yup.string().required(),

});
