export const calculateBMI = (weight, height) => {
  const weightInKg = parseFloat(weight);
  const heightInMeters = parseFloat(height) / 100; // Convert height to meters
  const bmiValue = weightInKg / (heightInMeters * heightInMeters);
  return bmiValue.toFixed(2); // Return BMI with two decimal places
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return "Недостатня вага";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Нормальна вага";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Надмірна вага";
  } else if (bmi >= 30 && bmi < 34.9) {
    return "Ожиріння І класу";
  } else if (bmi >= 35 && bmi < 39.9) {
    return "Ожиріння ІІ класу";
  } else {
    return "Ожиріння ІІІ класу";
  }
};

export const calculateRecommendedWeight = (height) => {
  const heightInMeters = parseFloat(height) / 100;

  // Рекомендації ІМТ зазвичай в діапазоні від 18.5 до 24.9
  const lowerBMI = 18.5;
  const upperBMI = 24.9;

  const lowerWeight = lowerBMI * heightInMeters * heightInMeters;
  const upperWeight = upperBMI * heightInMeters * heightInMeters;

  return {
    lowerWeight: lowerWeight.toFixed(2),
    upperWeight: upperWeight.toFixed(2),
  };
};

export const getTotalRecomendations = (weight, height) => {
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  const recommendedWeight = calculateRecommendedWeight(height);

  return { bmi, bmiCategory, recommendedWeight };
};
