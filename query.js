db.getCollection('hop').aggregate([{$match: {'DRGDefination': {$regex: "W/O MCC"} } },{$group: {
        _id: {
            ProviderState: "$ProviderState",
            ProviderCity: "$ProviderCity"
        },       sum:{$sum:"$TotalDischarges" },
    }
},{    $group: {
        _id: "$_id.ProviderState",
        City: {
            $push: {
                ProviderCity: "$_id.ProviderCity",
                TotalDischarges: $sum
            }},	sum: {"$sum":"$sum"}
    }
},{ $project: {	City:{$slice: ["$City",5] },	sum:1}},
{ $sort : { TotalDischarges: -1, sum:-1 } },
{ $limit: 5}
])