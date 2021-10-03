export const normalizeIngredient = (ingredient) => {
  const imageName = getIngredientImageName(ingredient);
  return {
    ...ingredient,
    count: 0,
    class: `filling--${imageName}`,
  };
};

export const normalizeAdditional = (product) => {
  return {
    ...product,
    count: 1,
  };
};

const getIngredientImageName = (ingredient) => {
  const image = ingredient.image.split(`/`).pop();
  return image.split(`.`).reverse().pop();
};

export const normalizeDough = (dough) => {
  return {
    ...dough,
    class:
      dough.name === "Толстое"
        ? "dough__input dough__input--large"
        : "dough__input dough__input--light",
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    class: getSizeClass(size),
  };
};

const getSizeClass = (size) => {
  switch (size.name) {
    case "23 см":
      return "diameter__input diameter__input--small";
    case "32 см":
      return "diameter__input diameter__input--normal";
    default:
      return "diameter__input diameter__input--big";
  }
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getValidationErrorMessage = (validations) => {
  let errors = [];

  Object.keys(validations).forEach((key) => {
    const error = validations[key].error;
    if (error.length) {
      const message = `${validations[key].name} - ${error}`;
      errors.push(message);
    }
  });

  return errors.join(".\n");
};
