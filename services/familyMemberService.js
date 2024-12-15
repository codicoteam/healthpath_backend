const FamilyMember = require('../models/familyMember/family_member_schema'); // Adjust the path as per your project structure

// Service to create a new family member
const createFamilyMember = async (familyMemberData) => {
    try {
        // Check if email already exists
        const existingFamilyMember = await FamilyMember.findOne({ email: familyMemberData.email });
        if (existingFamilyMember) {
            throw new Error('Email already exists');
        }

        // Create and save a new family member
        const newFamilyMember = new FamilyMember(familyMemberData);
        await newFamilyMember.save();
        return newFamilyMember;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all family members
const getAllFamilyMembers = async () => {
    try {
        const familyMembers = await FamilyMember.find().populate('clientId', 'firstName lastName email');
        return familyMembers;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a family member by email
const getFamilyMemberByEmail = async (email) => {
    try {
        return await FamilyMember.findOne({ email }).populate('clientId', 'firstName lastName email');
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch family members by client ID
const getFamilyMembersByClientId = async (clientId) => {
    try {
        return await FamilyMember.find({ clientId }).populate('clientId', 'firstName lastName email');
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a family member
const updateFamilyMember = async (id, updateData) => {
    try {
        const updatedFamilyMember = await FamilyMember.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFamilyMember) {
            throw new Error('Family member not found');
        }
        return updatedFamilyMember;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a family member
const deleteFamilyMember = async (id) => {
    try {
        const deletedFamilyMember = await FamilyMember.findByIdAndDelete(id);
        if (!deletedFamilyMember) {
            throw new Error('Family member not found');
        }
        return deletedFamilyMember;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createFamilyMember,
    getAllFamilyMembers,
    getFamilyMemberByEmail,
    getFamilyMembersByClientId,
    updateFamilyMember,
    deleteFamilyMember,
};
