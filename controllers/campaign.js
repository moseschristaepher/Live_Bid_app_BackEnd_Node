

const Campaign = require('../models/campaign');



///////// CREATE A NEW CAMPAIGN CONTROLLER /////////
exports.createNewCampaign = (req, res, next) => {

    const setup = req.body.setup;
    const priceSetup = req.body.priceSetup;
    const setting = req.body.setting;
    const status = req.body.status;
    const releaseDate = req.body.release_date;

    const campaign = new Campaign({
        setup: setup,
        priceSetup: priceSetup,
        setting: setting,
        status: status,
        releaseDate: releaseDate

    });
    campaign.save()
        .then(result => {

            res.status(201).json({ message: 'campaign created successfully', campaign: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


///////// CREATE A NEW COMPAIGN CONTROLLER /////////
exports.createNewCampaignNew = async (req, res, next) => {

    const setup = req.body.setup;
    const priceSetup = req.body.priceSetup;
    const setting = req.body.setting;
    const status = req.body.status;
    const releaseDate = req.body.release_date;

    try {

        const campaign = new Campaign({
            setup: setup,
            priceSetup: priceSetup,
            setting: setting,
            status: status,
            releaseDate: releaseDate
    
        });

        await campaign.save()

        res.status(201).json({ message: 'campaign created successfully', campaign: campaign })

    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }

        res.status(400).send(err)

    }
}