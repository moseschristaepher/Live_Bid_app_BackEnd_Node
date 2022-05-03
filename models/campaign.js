


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    
    setup: {
        captcha: {type: String, required: true},
        timezone: {type: String, required: true},
        end: {type: Date, required: true},
        start: {type: Date, required: true},
        name: {type: String, required: true},
        terms: {
            sponser_name: {type: String, required: true},
            sponser_address: {type: String, required: true},
            policy: {type: String, required: true},
            winner_select_by: {type: String, required: true},
            winner_contact_days: {type: String, required: true},
            winner_claim_prize_days: {type: String, required: true},
            additional_terms: {type: String, required: true}
        }
    },
    priceSetup: {
        competition_title: {type: String, required: true},
        competition_description: {type: String, required: true},
        image: {type: String, required: true},
        price_name: {type: String, required: true},
        winners: {type: String, required: true},
        value: {type: String, required: true}

    },
    setting: {
        winner_announcement: {
            manual: {type: String, required: true},
            auto: {type: String, required: true}
        }
    },
    status: {
        type: String,
        required: true
    },
    release_date: {
        type: String
    }
});

module.exports = mongoose.model('Campaign', campaignSchema);