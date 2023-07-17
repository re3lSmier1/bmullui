export const failValidation = ({ values, errors, results }) => {
  console.log("failed validation");
}

export function successValidation(values) {
  console.log('validated', values);
}
