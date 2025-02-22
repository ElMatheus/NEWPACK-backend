const formatCep = (cep) => {
  const replaceCep = cep.replace(/[^0-9]/g, '');
  return replaceCep.slice(0, 5) + '-' + replaceCep.slice(5, 8);
};

export default formatCep;