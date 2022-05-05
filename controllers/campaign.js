

const Campaign = require('../models/campaign');


///////// CREATE A NEW COMPAIGN AND THEN UPDATE NEW CAMPAIGN IN SAME API (ROUTE) CONTROLLER /////////
exports.saveCampaign = async (req, res, next) => {

    const id = req.body.id;
    const setup = req.body.setup;
    const priceSetup = req.body.priceSetup;
    const setting = req.body.setting;
    const status = req.body.status;
    const releaseDate = req.body.release_date;

    try {

        // console.log(id.toString())|| (id.toString() === "null") || (id.toString() === "")

        if (!(id) || (id === "null") || (id === "")) {

            const campaign = new Campaign({
                setup: setup,
                priceSetup: priceSetup,
                setting: setting,
                status: status,
                releaseDate: releaseDate
        
            });
    
            await campaign.save()
    
            res.status(201).json({ message: 'campaign created successfully', campaign: campaign })


        } else {

            const campaign = await Campaign.findById(id);

            if (!campaign) {
                
                return res.status(404).send({ message: "could not find the campaign"})

            }

            campaign["setup"] = setup;

            await campaign.save()

            res.status(201).send({message: "campaign updated successfully", campaign: campaign})

        }

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }

        res.status(500).send({err, message: "some error occured"})

    }
}