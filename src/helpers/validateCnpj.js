const validateCnpj = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) {
    return false;
  }
  return true;
};

export default validateCnpj;