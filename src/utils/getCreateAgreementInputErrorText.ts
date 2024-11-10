import { CreateAgreementInput } from '../inputs/AgreementInputs';

export const getCreateAgreementInputErrorText = ({ name, agreementTypeId }: CreateAgreementInput): string => {
  let variableText: string;

  switch (true) {
    case !name && !agreementTypeId:
      variableText = ' имя и ID типа договора';
      break;
    case !name && !!agreementTypeId:
      variableText = ' имя договора';
      break;
    default:
      variableText = ' ID типа договора';
  }

  return `Необходимо указать${variableText}`;
};
