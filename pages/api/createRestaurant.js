import { restaurantsTable } from "../../utils/airtable"

const createRestaurant = async (req, res) => {
    if (req.method === "POST") {
        try {
            const {id, name, address, category, tip1, tip2, tip3, photoUrl, votes, rating} = req.body

            if (id) {
                const findRestaurantRecord = await restaurantsTable.select({filterByFormula: `id="${id}"`}).firstPage()
                if (findRestaurantRecord.length > 0) {
                    res.json(findRestaurantRecord[0].fields)
                } else {
                    if (name) {
                        const createRecord = await restaurantsTable.create([
                            {
                              "fields": {
                                  Id: id,
                                  Name: name,
                                  Address: address,
                                  Category: category,
                                  Tip1: tip1,
                                  Tip2: tip2,
                                  Tip3: tip3,
                                  PhotoUrl: photoUrl,
                                  Votes: votes,
                                  Rating: rating,
                              }
                            },
                        ])
                        res.json(createRecord[0].fields)    
                    } else {
                        res.status(500).json({'message': 'Name is missing'})
                    }
                }
            } else {
                res.status(500).json({'message': 'Id is missing'})
            }
        } catch (err) {
            res.status(500).json({'error': err})
        }   
    }    
}

export default createRestaurant