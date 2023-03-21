class Student{
    constructor(model) {
        this.model = model;
    }    


    clean = (obj) => {
        for (var propName in obj) {
            if (obj[propName] === '') {
                delete obj[propName];
            }
        }
        return obj
    }


    getAll = async (properties, sort) => {
        if(properties){
            properties = this.clean(properties)
            sort = {[properties?.sort] : parseInt(properties?.order)}
            delete properties?.sort;
            delete properties?.order;
        }

        console.log(properties)
        console.log(sort)

        try{
            const res = await this.model.find({...properties}).sort({...sort});
            return res
        }catch(err){
            console.error('Failed to get students', err)
        }
    }

    create = async data => {
        const base = {
            validated: 'in progress',
            admin: false
        }

        const newStudent = new this.model({ 
            ...data, ...base
        });

        try{
            const res = await newStudent.save()
            console.log(res)
        }catch(err){
            console.log('Failed to save student', err)
        }
    }

    update = async (id, data) => {
        try{
            const res = await this.model.findByIdAndUpdate(id, data)
            console.log(res)
        }catch(err){
            console.log('Failed to update student', err)
        }
    }

    delete = async id => {
        try{
            const res = await this.model.deleteOne({ _id: id})
            console.log(res)
        }catch(err){
            console.log('Failed to save student', err)
        }
    }
}



exports.Student = Student
