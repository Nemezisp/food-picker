import { restaurantsTable } from "../../utils/airtable"

const voteRestaurant = async (req, res) => {
    if (req.method === "PUT") {
        try {
            const {id} = req.query
            const {rating} = req.body
            if (id) {
                const findRestaurantRecord = await restaurantsTable.select({filterByFormula: `id="${id}"`}).firstPage()
                if (findRestaurantRecord.length > 0) {
                    const restaurantRecord = findRestaurantRecord[0].fields;
                    const newVotes = parseInt(restaurantRecord.Votes) + 1;
                    const newRating = (parseFloat(restaurantRecord.Rating)*parseFloat(restaurantRecord.Votes) + parseFloat(rating))/parseFloat(newVotes)
                    
                    const updateVotes = await restaurantsTable.update([
                        {
                            id: findRestaurantRecord[0].id,
                            fields: {
                                Votes: newVotes,
                                Rating: newRating
                            }
                        }
                    ])

                    if (updateVotes) {
                        res.json(updateVotes[0].fields)
                    }
                
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

export default voteRestaurant