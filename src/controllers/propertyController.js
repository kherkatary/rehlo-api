import Property from '../models/RoomModel.js'

const addProperty = async (req, res) => {
    try {
        const propertyData = req.body; // assuming the request body contains the property data

        const newProperty = new Property(propertyData);
        await newProperty.save();

        res.status(201).json({
            success: true,
            message: 'Property added successfully',
            property: newProperty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding property',
            error: error.message
        });
    }
};

const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().select('location _id title price rating images');
        res.status(200).json({
            success: true,
            properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching properties',
            error: error.message
        });
    }
};

const getSpecificRoom = async (req, res) => {
    const { id } = req.params; 

    try {
        const room = await Property.findById(id);
        console.log("done here")
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        res.status(200).json({
         
            success: true,
            room 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching room',

            error: error.message
        });
    }
};


export {getAllProperties,addProperty, getSpecificRoom}
