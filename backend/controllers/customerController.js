import Customer from "../models/customer.models.js"
import Lead from "../models/leads.models.js"
import { customerCreateSchema, customerUpdateSchema } from "../Validation/schemas.js"

const scopeFilter = (req) => (req.user.role === "admin" ? {} : { ownerId: req.user._id })

export const createCustomer = async (req, res) => {
    try {
        const { error, value } = customerCreateSchema.validate(req.body)

        if (error) 
            return res.status(400).json({ message: error.details[0].message })

        const customer = await Customer.create({ ...value, ownerId: req.user._id })

        res.status(201).json({message : "Customer created Successfully !",customer})

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error creating customer" })
    }
}

export const getCustomers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const filter = scopeFilter(req)

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }

        const customers = await Customer.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 })

        const total = await Customer.countDocuments(filter)

        res.json({ total, page: Number(page), pages: Math.ceil(total / limit), customers })

    } catch (err) {
        res.status(500).json({ message: "Error fetching customers" })
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const filter = { ...scopeFilter(req), _id: req.params.id }

        const customer = await Customer.findOne(filter)
        if (!customer) 
            return res.status(404).json({ message: `Customer with id ${req.params.id} not found` })

        const leads = await Lead.find({ customerId: customer._id })

        res.json({ ...customer.toObject(), leads })

    } catch (err) {
        res.status(500).json({ message: "Error fetching customer" })
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const { error, value } = customerUpdateSchema.validate(req.body)

        if (error) 
            return res.status(400).json({ message: error.details[0].message })

        const filter = { ...scopeFilter(req), _id: req.params.id }

        const customer = await Customer.findOneAndUpdate(filter, value, { new: true })

        if (!customer) 
            return res.status(404).json({ message: "Customer not found" })

        res.json(customer)

    } catch (err) {
        res.status(500).json({ message: "Error updating customer" })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const filter = { ...scopeFilter(req), _id: req.params.id }

        const customer = await Customer.findOneAndDelete(filter)

        if (!customer) 
            return res.status(404).json({ message: `Customer with id ${req.params.id} not found` })

        await Lead.deleteMany({ customerId: customer._id })

        res.json({ message: "Customer deleted successfully !" })

    } catch (err) {
        res.status(500).json({ message: "Error deleting customer. Try Again !" })
    }
}