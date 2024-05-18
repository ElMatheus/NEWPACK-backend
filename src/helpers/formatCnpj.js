const formatCnpj = (cnpjParams) => {
  const cnpj = cnpjParams.replace(/\D/g, '');
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
};

export default formatCnpj;