
const studentSchemaObject = {
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type : String,
        validate : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone : {
        type: String,
        minlength: 10,
        maxlength: 10,
    },
    validated: {
        type: String,
        enum: {
            values: [
                "in progress",
                "validated",
                "rejected"
            ]
        }
    },
    admin : Boolean
}

exports.studentSchemaObject = studentSchemaObject
