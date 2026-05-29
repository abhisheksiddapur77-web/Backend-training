const Car = require("../model/cars");

const createCar = async (req, res) => {
  try {
    const { make, model, year, price, mileage, condition, description, color, fuelType, transmission } = req.body;

    const carData = await Car.create({
      make,
      model,
      year,
      price,
      mileage,
      condition,
      description,
      color,
      fuelType,
      transmission
    });

    res.status(201).json({
      message: "Car listed successfully",
      data: carData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const allCars = await Car.find().sort({ createdAt: -1 });
    res.json({
      message: "All cars retrieved",
      allCars
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      message: "Car details retrieved",
      car
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, price, mileage, condition, description, color, fuelType, transmission } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { make, model, year, price, mileage, condition, description, color, fuelType, transmission },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      message: "Car updated successfully",
      car: updatedCar
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      message: "Car deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCar, getAllCars, getCarById, updateCar, deleteCar };
