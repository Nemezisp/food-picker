import { restaurantsTable } from "../../utils/airtable"

const getRestaurant = async (req, res) => {
    if (req.method === "GET") {
        try {
            const {id} = req.query
            if (id) {
                const findRestaurantRecord = await restaurantsTable.select({filterByFormula: `id="${id}"`}).firstPage()
                if (findRestaurantRecord.length > 0) {
                    res.json(findRestaurantRecord[0].fields)
                } else {
                  res.json({'message': 'Restaurant not found'})
                }
            } else {
                res.status(500).json({'message': 'Id is missing'})
            }
        } catch (err) {
            res.status(500).json({'error': err})
        }   
    }    
}

export default getRestaurant