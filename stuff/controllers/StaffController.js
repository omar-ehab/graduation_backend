const { Staff } = require('../models');
const { createStaffScheme, updateStaffScheme, valid_unique_values } = require('../helpers/validation_schema');


//show all staff
const index = async (req, res) => {
    try {
        const staff = await Staff.findAll()

        return res.json({ success: true, staff});

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: 'something went WRONG' })
    }
}

//create staff
const store = async (req, res) => {
    try {
        const result = await createStaffScheme.validateAsync(req.body);
        const validated = await valid_unique_values(result);
        const { name, email, password, phone_number, job_title } = result;
        if(validated === true){
            const staff = await Staff.create({ name, email, password, phone_number, job_title });
            res.json({success: true, staff});
        } else {
            res.status(422).json(validated);
        }

    } catch (err) {
        if(err.isJoi){
            res.status(422).json({
                success: false,
                error: err
            });
        }
        res.status(500).json({success:false, err});
    }
}

//fine one staff by id
const show = async (req, res) => {
    const id = req.params.id

    try {
        const staff = await Staff.findOne({
            where: { id }
        })

        res.json({ success: true, staff})

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: 'something went WRONG' })
    }
}
//fine one staff by email
const readByEmail = async (req, res) => {
    const email = req.params.email

    try {
        const staff = await Staff.findOne({
            where: { email }
        })

        res.json({ success: true, staff})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, error: 'something went WRONG' })
    }
}

//update staff
const update = async (req, res) => {
    try {
        const id = req.params.id
        const result = await updateStaffScheme.validateAsync(req.body);
        const validated = await valid_unique_values({...result, id});
        const { name, email, phone_number, job_title } = result
        
        if(validated === true){
            const staff = await Staff.findOne({ where: { id } })

            if(email){
                staff.email = email
            }
            if(phone_number){
                staff.phone_number = phone_number
            }
            staff.name = name;
            staff.job_title = job_title;

            await staff.save()
            res.json({ success: true, staff})
        } else {
            res.status(422).json(validated)
        }

    } catch (err) {
        if(err.isJoi){
            res.status(422).json({
                success: false,
                error: err
            });
        }
        console.log(err);
        res.status(500).json({ success:false, error: 'SOMTHING went WRONG' });
    }
}

//delete staff
const destroy = async (req, res) => {
    const id = req.params.id

    try {
        const staff = await Staff.findOne({ where: { id } });

        await staff.destroy();
        res.json({ success:true, message: 'STAFF DELETED' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success:false, error: 'SOMTHING WENT WRONG' });
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
    readByEmail
}
