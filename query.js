db.getCollection('hop').aggregate([
        _id: {
            ProviderState: "$ProviderState",
            ProviderCity: "$ProviderCity"
        },
    }
},
        _id: "$_id.ProviderState",
        City: {
            $push: {
                ProviderCity: "$_id.ProviderCity",
                TotalDischarges: $sum
            }},
    }
},
{ $sort : { TotalDischarges: -1, sum:-1 } },
{ $limit: 5}
])