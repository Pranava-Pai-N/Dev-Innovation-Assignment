import Lead from "../models/leads.models.js";
import Customer from "../models/customer.models.js";


const scopeFilter = (req) => (req.user.role === "admin" ? {} : { ownerId: req.user._id });



export const createLead = async (req, res) => {
    try {
        const { customerId } = req.params;

        const customer = await Customer.findOne({ _id: customerId, ...scopeFilter(req) });

        if (!customer) 
            return res.status(404).json({ message: `Customer with id ${customerId} not found` });

        const lead = await Lead.create({
            ...req.body,
            customerId,
            createdAt: new Date()
        });

        res.status(201).json(lead);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getLeads = async (req, res) => {
    try {
        const { customerId } = req.params;

        const customer = await Customer.findOne({ _id: customerId, ...scopeFilter(req) });

        if (!customer) 
            return res.status(404).json({ message: `Customer with id ${customerId} not found`});

        const leads = await Lead.find({ customerId }).sort({ createdAt: -1 });

        res.json(leads);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getLeadById = async (req, res) => {
    try {
        const { customerId, leadId } = req.params;

        const lead = await Lead.findOne({ _id: leadId, customerId });

        if (!lead) 
            return res.status(404).json({ message: `Lead with id ${leadId} not found` });

        res.json(lead);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateLead = async (req, res) => {
    try {
        const { customerId, leadId } = req.params;

        const lead = await Lead.findOneAndUpdate(
            { _id: leadId, customerId },
            req.body,
            { new: true }
        );

        if (!lead) 
            return res.status(404).json({ message: `Lead with id ${leadId} not found` });

        res.json(lead);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const { customerId, leadId } = req.params;

        const lead = await Lead.findOneAndDelete({ _id: leadId, customerId });

        if (!lead) 
            return res.status(404).json({ message: `Lead with id ${leadId} not found` });

        res.json({ message: "Lead deleted successfully !" });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};