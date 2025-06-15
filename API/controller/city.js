import city from "../model/city.js";

export const addCity = async (req, res,next) => {
    try {
        
        if (!req.body) {
            return res.status(400).json({ msg: "Name and population are required" });
        }else{
            const newCity = new city(req.body);
            await newCity.save();
            res.status(201).json({ msg: "City added successfully", city: newCity });
        }

    } catch (error) {
        console.error("Error adding city:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const getCity = async (req, res,next) => {
    const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const cities = await city.find().skip(skip).limit(limit);
    const totalCities = await city.countDocuments();
    const totalPages = Math.ceil(totalCities / limit);

    res.status(200).json({
      cities,
      currentPage: page,
      totalPages,
      totalCities
    });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch cities", error: error });
  }
}   

export const updateCity = async (req, res,next) => {
    try {
        const updatedCity = await city.findByIdAndUpdate({_id: req.params.id},req.body,
            { new: true }
        ); 
        if (!updatedCity) {
            return res.status(404).json({ msg: "City not found" });            
        }else{
            res.status(200).json({ msg: "City updated successfully", city: updatedCity });
        }
    } catch (error) {
        console.error("Error updating city:", error);
        res.status(500).json({ msg: "Internal server error" });
    }   
}

export const deleteCity = async (req, res,next) => {
    try {
        const deletedCity = await city.findByIdAndDelete({_id: req.params.id});
        if (!deletedCity) {
            return res.status(404).json({ msg: "City not found" });
        }else{
            res.status(200).json({ msg: "City deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting city:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
